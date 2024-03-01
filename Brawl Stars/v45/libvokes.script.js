var base = Module.findBaseAddress('libg.so');
var connect = new NativeFunction(Module.findExportByName('libc.so', 'connect'), 'int', ['int', 'pointer', 'uint']);
var malloc = new NativeFunction(Module.findExportByName('libc.so', 'malloc'), 'pointer', ['int']);
var free = new NativeFunction(Module.findExportByName('libc.so', 'free'), 'void', ['pointer']);
var memmove = new NativeFunction(Module.findExportByName('libc.so', 'memmove'), 'pointer', ['pointer', 'pointer', 'int']);
var ntohs = new NativeFunction(Module.findExportByName('libc.so', 'ntohs'), 'uint16', ['uint16']);
var inet_addr = new NativeFunction(Module.findExportByName('libc.so', 'inet_addr'), 'int', ['pointer']);
var libc_send = new NativeFunction(Module.findExportByName('libc.so', 'send'), 'int', ['int', 'pointer', 'int', 'int']);


Interceptor.attach(Module.findExportByName('libc.so', 'connect'), {
    onEnter: function(args) {
        if (ntohs(Memory.readU16(args[1].add(2))) === 9339) {
            cache.fd = args[0].toInt32();
            Memory.writeInt(args[1].add(4), inet_addr(Memory.allocUtf8String("192.168.0.102")));
        }
    }