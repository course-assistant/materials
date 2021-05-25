import datetime


# 从2021-3-1 开始
# 每周 周一到周五


t_str = '2021-3-1'
d = datetime.datetime.strptime(t_str, '%Y-%m-%d')


n = 1
day = 1

while True:

    xq = d.strftime("%w")
    if(int(xq) == 6 or int(xq) == 0):
        d = d + datetime.timedelta(days=1)
        day += 1
        continue

    if(int(xq) == 1):
        xq = '一'
    elif(int(xq) == 2):
        xq = '二'
    elif(int(xq) == 3):
        xq = '三'
    elif(int(xq) == 4):
        xq = '四'
    elif(int(xq) == 5):
        xq = '五'

    name = '%s 星期%s 第%02d天 %02d.md' % (d.strftime('%Y-%m-%d'), xq, day, n)
    content = '# 毕业设计第%02d天' % day
    print(name)
    print(content)

    # 生成文件
    with open(name, 'w', encoding='utf-8') as f:
        f.write(content)
        pass

    if(n == 60):
        break
    n += 1
    day += 1
    d = d + datetime.timedelta(days=1)
    pass
