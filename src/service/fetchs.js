/**
 * Created by hongjiayong on 2017/6/13.
 */
import fetch from './getData'

var getUsers = () => fetch('GET', 'api/user', {})

export {getUsers}
