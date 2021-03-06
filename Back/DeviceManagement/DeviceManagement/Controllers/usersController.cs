﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using EntityModel;
using Crud;
using System.Web.Http.Cors;
using encryption;
using Service;

namespace DeviceManagement.Controllers
{

    [EnableCors("*", "*", "*")]
    public class usersController : ApiController
    {
        private Entities db = new Entities();

        private UserCrubOperator userCrudOperator = new UserCrubOperator();

        private MD5encryptor md = new MD5encryptor();

        private RecommendService recom = new RecommendService();

        // GET: api/users
        public List<user> Getusers()
        {
            var ret_list =  db.users.ToList();

            foreach (var item in ret_list) {
                db.Entry(item).State = EntityState.Detached;
            }

            return ret_list;

        }

        // GET: api/users/5
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Getuser(string id)
        {
            user user = await db.users.FindAsync(id);
           
            if (user == null)
            {
                return NotFound();
            }

            db.Entry(user).State = EntityState.Detached;

            return Ok(user);
        }

        // PUT: api/users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Putuser(string id, user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.id)
            {
                return BadRequest();
            }

            //加密密码
            user.password = md.encrypt(user.password, user.id);

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/users
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Postuser(user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //加密密码
            user.password = md.encrypt(user.password, user.id);

            db.users.Add(user);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (userExists(user.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.id }, user);
        }

        // DELETE: api/users/5
        [ResponseType(typeof(user))]
        public async Task<IHttpActionResult> Deleteuser(string id)
        {
            if (this.userCrudOperator.delete(id))
            {
                return Ok();
            }
            else {
                return NotFound();
            }

            
        }

        [HttpGet]
        [Route("api/user/recommend")]
        public List<string> recommend(string type) {

            return recom.recommend(type); 

        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userExists(string id)
        {
            return db.users.Count(e => e.id == id) > 0;
        }
    }
}