# 微信小程序 数据缓存

微信端不区分教师或者学生的token，统一叫token，方便发送请求时不用区分用户类型

每次登录时，刷新这个token值

| key                                 | 含义                  |
| ----------------------------------- | --------------------- |
| hncj_assistant_wx_user_token | 当前用户token       |
| hncj_assistant_wx_user_type | 当前用户类型，用作登录验证 |
| hncj_assistant_wx_user_id    | 当前用户id |
| hncj_assistant_wx_user_name | 当前用户姓名 |
| hncj_assistant_wx_user_avatar | 当前用户头像 |

