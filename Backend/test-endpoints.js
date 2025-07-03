const http = require('http');

function makeRequest(path, callback) {
    const options = {
        hostname: 'localhost',
        port: 9000,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                callback(null, response);
            } catch (error) {
                callback(error, null);
            }
        });
    });

    req.on('error', (error) => {
        callback(error, null);
    });

    req.end();
}

console.log('🔍 Testing API endpoints...\n');

// Test Footer API
makeRequest('/api/footer', (error, data) => {
    console.log('📄 Footer API:');
    if (error) {
        console.log('❌ Error:', error.message);
    } else if (data.success) {
        console.log('✅ Success');
        console.log('- Legal Links:', data.data.legalLinks?.length || 0);
        console.log('- Social Links:', data.data.socialLinks?.length || 0);
        console.log('- Copyright:', data.data.companyInfo?.copyright ? 'Found' : 'Missing');
    } else {
        console.log('❌ Failed:', data.message);
    }
    console.log('');
});

// Test Music API
makeRequest('/api/music', (error, data) => {
    console.log('🎵 Music API:');
    if (error) {
        console.log('❌ Error:', error.message);
    } else if (data.success) {
        console.log('✅ Success');
        console.log('- Tracks:', data.data.tracks?.length || 0);
        console.log('- Default Theme:', data.data.defaultTheme ? 'Found' : 'Missing');
    } else {
        console.log('❌ Failed:', data.message);
    }
    console.log('');
});

// Test Testimonials API
makeRequest('/api/testimonials', (error, data) => {
    console.log('💬 Testimonials API:');
    if (error) {
        console.log('❌ Error:', error.message);
    } else if (data.success) {
        console.log('✅ Success');
        console.log('- Count:', data.data?.length || 0);
    } else {
        console.log('❌ Failed:', data.message);
    }
    console.log('');
});

// Test Promotions API
makeRequest('/api/promotions', (error, data) => {
    console.log('🎯 Promotions API:');
    if (error) {
        console.log('❌ Error:', error.message);
    } else if (data.success) {
        console.log('✅ Success');
        console.log('- Count:', data.data?.length || 0);
    } else {
        console.log('❌ Failed:', data.message);
    }
    console.log('');
});
