<div id="metaData" createTime="2020-07-18 20:15:00" category="学习笔记" tags="后端;Python" title="python标准库 -- socket"></div>

# Socket  python标准库

## socket是什么？
Socket 是任何一种计算机网络通讯中最基础的内容。当你在浏览器地址栏中输入一个地址时，你会打开一个套接字，可以说任何网络通讯都是通过 Socket 来完成的

>  Socket 的 python 官方函数 [http://docs.python.org/library/socket.html](http://docs.python.org/library/socket.html)

**socket和file的区别：**

1. file模块是针对某个指定文件进行【打开】【读写】【关闭】

1. socket模块是针对 服务器端 和 客户端Socket 进行【打开】【读写】【关闭】


## 基本流程：

<span style="font-family: 楷体; font-size: 16px;">![](https://img2018.cnblogs.com/blog/1398749/201809/1398749-20180904143455434-1094282677.png)</span>

&nbsp;

<span style="font-family: 楷体; font-size: 16px;">简单的一个端对端单线通信代码如下：</span>

**<span style="font-family: 楷体; font-size: 16px;">Server：</span>**

```python
#-*-coding：utf-8 -*-
import socket
    
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(("0.0.0.0", 12800))
sock.listen(2)
while True:
   conn, sockname = sock.accept()
    
print(f"Now, We have accepted aconnection from:{sockname}")
print(f"Socket Name is: {conn.getsockname()}")
print(f"Socket Peer is: {conn.getpeername()}")
message = conn.recv(1024)
print(f"The message we have received is:\n {message}")
```

**Client：**
```python
#-*-coding：utf-8 -*-
import socket

sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
sock.connect(("127.0.0.1",12800))
sock.send(b"Hello World!")

```

<span style="font-family: 楷体;">**参数解释：**</span>
```python
socket.socket(family=AF_INET, type=SOCK_STREAM, proto=0, fileno=None):
    """
    创建一个套接字对象，所有套接字操作基于此对象进行
        :param family：套接字协议族，包括：有两种类型的套接字：基于文件的和面向网络的。AF表示地址家族（address family）
            AFUNIX：该套接字是基于文件的，一般用于本机通信
　　　　      AF_INET：该套接字是基于网络的，这也是最常用的（默认） 　　
　　　　      AFINET6：用于第6版因特网协议（IPv6）寻址
        :param type：套接字类型，常用的有两种：
            socket.SOCK_STREAM	流式socket , for TCP （默认）
            socket.SOCK_DGRAM	数据报式socket , for UDP
            socket.SOCK_RAW	原始套接字，普通的套接字无法处理ICMP、IGMP等网络报文，而SOCK_RAW可以；其次，SOCK_RAW也可以处理特殊的IPv4报文；此外，利用原始套接字，可以通过IP_HDRINCL套接字选项由用户构造IP头。
            socket.SOCK_RDM	是一种可靠的UDP形式，即保证交付数据报但不保证顺序。SOCK_RAM用来提供对原始协议的低级访问，在需要执行某些特殊操作时使用，如发送ICMP报文。SOCK_RAM通常仅限于高级用户或管理员运行的程序使用。
            socket.SOCK_SEQPACKET	可靠的连续数据包服务
        :param proto：协议，与特定的地址家族相关的协议, 如果是0, 则系统就会根据地址格式和套接类别, 自动选择一个合适的协议
    """
```

<span style="font-size: 16px; font-family: 楷体;color:red">**sock.bind(address)**</span>

<span style="font-size: 16px; font-family: 楷体;">　　**sock.bind(address) 将套接字绑定到地址。address地址的格式取决于地址族。在AF_INET下，以元组（host,port）的形式表示地址。**</span>

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.listen(backlog)<span style="font-size: 16px; font-family: 楷体;"><span style="color: #ff0000;">-- 服务端</span></span></span>**

**<span style="font-size: 16px; font-family: 楷体;">　　开始监听传入连接。backlog指定在拒绝连接之前，可以挂起的最大连接数量。</span>**

**<span style="font-size: 16px; font-family: 楷体;">&nbsp; &nbsp; backlog等于5，表示内核已经接到了连接请求，但服务器还没有调用accept进行处理的连接个数最大为5
<span style="font-size: 16px; font-family: 楷体;">&nbsp; &nbsp; 这个值不能无限大，因为要在内核中维护连接队列，一般默认值为5</span></span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.settimeout(timeout)</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　设置套接字操作的超时期，timeout是一个浮点数，单位是秒。值为None表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如 client 连接最多等待5s ）</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.getpeername()</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　返回连接套接字的远程地址。返回值通常是元组（ipaddr,port）。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.getsockname()</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　返回套接字自己的地址。通常是一个元组(ipaddr,port)</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.fileno()</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　套接字的文件描述符</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.setblocking(bool)</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　是否阻塞（默认True），如果设置False，那么accept和recv时一旦无数据，则报错。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.accept()<span style="color: #ff0000;">-- 服务端</span>
</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　接受连接并返回（conn,address）,其中conn是新的套接字对象，可以用来接收和发送数据。address是连接客户端的地址。</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　接收TCP 客户的连接（阻塞式）等待连接的到来</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.connect(address)<span style="font-size: 16px; font-family: 楷体;"><span style="color: #ff0000;">-- 客户端</span></span></span>**

**<span style="font-size: 16px; font-family: 楷体;">　　连接到address处的套接字。一般，address的格式为元组（hostname,port）,如果连接出错，返回socket.error错误。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.connect_ex(address)</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　同上，只不过会有返回值，连接成功时返回 0 ，连接失败时候返回编码，例如：10061</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.close()</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　关闭套接字</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.recv(bufsize[,flag])</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　接受套接字的数据。数据以字符串形式返回，bufsize指定最多可以接收的数量。flag提供有关消息的其他信息，通常可以忽略。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.recvfrom(bufsize[.flag])</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　与recv()类似，但返回值是（data,address）。其中data是包含接收数据的字符串，address是发送数据的套接字地址。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.send(string[,flag])</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　将string中的数据发送到连接的套接字。返回值是要发送的字节数量，该数量可能小于string的字节大小。即：可能未将指定内容全部发送。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.sendall(string[,flag])</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　将string中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。成功返回None，失败则抛出异常。</span>**

**<span style="font-size: 16px; font-family: 楷体;">&nbsp; &nbsp; &nbsp; 内部通过递归调用send，将所有内容发送出去。</span>**

**<span style="font-size: 16px; font-family: 楷体;;color:red">sock.sendto(string[,flag],address)</span>**

**<span style="font-size: 16px; font-family: 楷体;">　　将数据发送到套接字，address是形式为（ipaddr，port）的元组，指定远程地址。返回值是发送的字节数。该函数主要用于UDP协议。</span>**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911193920547-847490169.png)**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911194024735-1222971158.png)**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911194111594-1878196425.png)**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911192838391-148407974.png)**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911192856000-2020421255.png)**

**![](https://images2017.cnblogs.com/blog/1222745/201709/1222745-20170911192955422-1608636975.png)**

