import multer, { diskStorage } from 'multer';
import { join } from 'path';

export class CsvUpload {
    
}


const file = diskStorage({
    destination:(req,res,cb)=>{
        cb(null,join(__dirname,'../temp'))
    },
    filename:(req, file ,cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({storage:file});


export const csvUpload = upload.single('test')
