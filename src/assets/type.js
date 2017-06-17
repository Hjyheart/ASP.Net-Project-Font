/**
 * Created by hongjiayong on 2017/6/18.
 */

const type = {
  computer: [
    {
      name: '联想',
      types: [
        {
          name: 'Y700-15系列',
          value: 10
        },
        {
          name: '小新Air Pro系列',
          value: 11
        },
        {
          name: 'YOGA 710-14系列',
          value: 12
        },
        {
          name: '拯救者R720-151KB系列',
          value: 13
        },
        {
          name: 'Idealpad 310S-14系列',
          value: 14
        },
        {
          name: '小新Air 12系列',
          value: 15
        },
        {
          name: 'IdeaPad 710S系列',
          value: 16
        },
        {
          name: '小新700系列',
          value: 17
        },
        {
          name: 'YOGA 5 Pro系列',
          value: 18
        },
        {
          name: 'YOGA Book系列',
          value: 19
        }
      ]
    },
    {
      name: '惠普',
      types: [
        {
          name: 'OMEN 15-AX200系列',
          value: 30
        },
        {
          name: 'PAVILION 14-AL100系列',
          value: 31
        },
        {
          name: 'OMEN 15-AX000系列',
          value: 32
        },
        {
          name: 'OMEN 17-W200系列',
          value: 33
        },
        {
          name: 'SPECTRE X360 13-AC000系列',
          value: 34
        },
        {
          name: 'SPECTRE X360 CONVE 13-W000系列',
          value: 35
        },
        {
          name: 'Pavilion Gaming NB 15-ak000系列',
          value: 36
        }
      ]
    },
    {
      name: '华硕',
      types: [
        {
          name: '飞行堡垒FX50系列',
          value: 40
        },
        {
          name: 'PRO453UJ系列',
          value: 41
        },
        {
          name: 'A556UF系列',
          value: 42
        },
        {
          name: '灵耀3系列',
          value: 43
        },
        {
          name: 'FL5900U系列',
          value: 44
        },
        {
          name: '灵珑 B9440UA系列',
          value: 45
        },
        {
          name: 'ZX50系列',
          value: 46
        },
        {
          name: 'A555系列',
          value: 47
        },
        {
          name: 'VM510L系列',
          value: 48
        },
        {
          name: 'FH5900系列',
          value: 49
        }
      ]
    },
    {
      name: 'ThinkPad',
      types: [
        {
          name: 'E470系列',
          value: 50
        },
        {
          name: 'New S2 2017系列',
          value: 51
        },
        {
          name: 'T470系列',
          value: 52
        },
        {
          name: '黑将S5系列',
          value: 53
        },
        {
          name: 'T460系列',
          value: 54
        },
        {
          name: 'X260系列',
          value: 55
        },
        {
          name: 'X1 Carbon 2016系列',
          value: 56
        },
        {
          name: '黑侠E570系列',
          value: 57
        },
        {
          name: 'New S2系列',
          value: 58
        },
        {
          name: 'T450系列',
          value: 59
        }
      ]
    },
    {
      name: 'Apple',
      types: [
        {
          name: 'MacBook Pro 13.3英寸（Broadwell）系列',
          value: 60
        },
        {
          name: 'MacBook Air 13.3英寸（Broadwell）系列',
          value: 61
        },
        {
          name: 'MacBook Pro（Retina屏）15.4英寸系列',
          value: 62
        },
        {
          name: 'MacBook Air 11.6英寸（Broadwell）系列',
          value: 63
        }
      ]
    }
  ],
  phone: [
    {
      name: 'Apple',
      types: [
        {
          name: 'iphone 4',
          value: 10
        },
        {
          name: 'iphone 4s',
          value: 11
        },
        {
          name: 'iphone 5',
          value: 12
        },
        {
          name: 'iphone 5s',
          value: 13
        },
        {
          name: 'iphone 6',
          value: 14
        },
        {
          name: 'iphone 6s',
          value: 15
        },
        {
          name: 'iphone 6s plus',
          value: 16
        },
        {
          name: 'iphone 7',
          value: 17
        },
        {
          name: 'iphone 7 plus',
          value: 18
        },
        {
          name: 'iphone SE',
          value: 19
        }
      ]
    },
    {
      name: '华为',
      types: [
        {
          name: 'Mate9系列',
          value: 20
        },
        {
          name: 'P10系列',
          value: 21
        },
        {
          name: 'Nova系列',
          value: 22
        },
        {
          name: 'Mate8系列',
          value: 23
        },
        {
          name: 'Mate7系列',
          value: 24
        },
        {
          name: 'P8系列',
          value: 25
        }
      ]
    },
    {
      name: '三星',
      types: [
        {
          name: 'GALAXY S8系列',
          value: 30
        },
        {
          name: 'GALAXY S7系列',
          value: 31
        },
        {
          name: 'GALAXY S6系列',
          value: 32
        }
      ]
    },
    {
      name: '小米',
      types: [
        {
          name: '6系列',
          value: 40
        },
        {
          name: '5系列',
          value: 41
        },
        {
          name: 'Note系列',
          value: 42
        },
      ]
    }
  ],
  ppc: [
    {
      name: 'Apple',
      types: [
        {
          name: 'iPad Air 2系列',
          value: 10
        },
        {
          name: 'iPad mini系列',
          value: 11
        }
      ]
    }
  ],
  camera: [
    {
      name: '佳能',
      types: [
        {
          name: '5D Mark IV系列',
          value: 10
        },
        {
          name: '5D Mark III系列',
          value: 11
        },
        {
          name: 'EOS M6系列',
          value: 12
        },
        {
          name: '6D系列',
          value: 13
        },
        {
          name: '800D系列',
          value: 14
        }
      ]
    },
    {
      name: '尼康',
      types: [
        {
          name: 'D810系列',
          value: 20
        },
        {
          name: 'D7500系列',
          value: 21
        },
        {
          name: 'D7100系列',
          value: 22
        }
      ]
    },
    {
      name: '索尼',
      types: [
        {
          name: 'A7RII系列',
          value: 30
        },
        {
          name: 'ILCE-6000系列',
          value: 31
        },
        {
          name: 'A7 II 系列',
          value: 32
        }
      ]
    }
  ],
  player: [
    {
      name: '铁三角',
      types: [
        {
          name: 'ATH-MSR7',
          value: 10
        },
        {
          name: 'ATH-IM70',
          value: 11
        },
        {
          name: 'ATH-IM03',
          value: 12
        }
      ]
    },
    {
      name: '索尼',
      types: [
        {
          name: 'EX系列',
          value: 20
        },
        {
          name: 'NC系列',
          value: 21
        },
        {
          name: 'ZX系列',
          value: 22
        }
      ]
    }
  ]
}

export {type}
