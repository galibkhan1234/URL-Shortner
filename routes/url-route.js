import express from "express";
import {
    handleDeleteURL, 
    handleGenerateNewShortURL,
    handleGetAnalytics
} from "../controllers/urll-controller.js";


const router = express.Router();


router.post('/',handleGenerateNewShortURL);
router.post('/delete/:shortId',handleDeleteURL);
router.get('/analytics/:shortId',handleGetAnalytics);



export default router;