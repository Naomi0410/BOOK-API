import express from "express"
import * as BookController from "../controller/book.js"


const router = express.Router()

router.get("/", BookController.getAllBooks)
router.post("/create", BookController.createBook)
router.get("/:id", BookController.getBookById)
router.put("/update/:id", BookController.updateBookById)
router.delete("/delete/:id", BookController.deleteBookById)


export default router;