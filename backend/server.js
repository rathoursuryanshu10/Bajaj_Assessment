
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const upload = multer();

app.post('/bfhl', upload.single('file_b64'), (req, res) => {
    try {
        const { data } = req.body;

        
        if (!data) {
            return res.status(400).json({ error: 'Data is required' });
        }

        
        const parsedData = JSON.parse(data);
        const userId = "rathoursuryanshu10"; 
        const email = "rathoursuryanshu10@gmail.com"; 
        const rollNumber = "0827CS223D18"; 
        
        const numbers = parsedData.filter(item => !isNaN(item));
        const alphabets = parsedData.filter(item => isNaN(item));
        const highestLowercase = alphabets.filter(char => char.toLowerCase() === char).sort().slice(-1);
        const isPrimeFound = numbers.some(num => {
            const n = parseInt(num);
            if (n < 2) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) return false;
            }
            return true;
        });

        
        const fileValid = req.file ? true : false;
        const fileMimeType = fileValid ? req.file.mimetype : null;
        const fileSizeKb = fileValid ? req.file.size / 1024 : null;

        res.json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase,
            is_prime_found: isPrimeFound,
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});