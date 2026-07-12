export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // 处理 /api/history 请求
        if (url.pathname === '/api/history') {
            // POST：保存聊天记录
            if (request.method === 'POST') {
                try {
                    const body = await request.json();
                    await env.CHAT_HISTORY.put('chat_history', JSON.stringify(body.messages));
                    return new Response('OK', { status: 200 });
                } catch (err) {
                    return new Response('保存失败', { status: 500 });
                }
            }
            
            // GET：读取聊天记录
            if (request.method === 'GET') {
                try {
                    const data = await env.CHAT_HISTORY.get('chat_history');
                    return new Response(data || '[]', {
                        headers: { 'Content-Type': 'application/json' }
                    });
                } catch (err) {
                    return new Response('读取失败', { status: 500 });
                }
            }
        }
        
        return new Response('Not found', { status: 404 });
    }
};
