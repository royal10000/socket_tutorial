import app from "./app.js";
import { Server } from 'socket.io'
import connectDb from "./database/index.js";
import Book from "./modal/Book.modal.js";

connectDb().then((data) => {
    console.log("app connected successfully")
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => {
        console.log("port connected successfully")
    })

    const io = new Server(server)
    io.on("connection", (socket) => {
        console.log("socket is connected successfully")
        socket.on("addbook", async (data) => {
            try {
                if (data) {
                    const { bookName, bookPrice } = data
                    const newBook = await Book.create({
                        bookName, bookPrice
                    })
                    io.to(socket.id).emit("response", {
                        status: 200,
                        message: "book created successfully",
                        data: data
                    })
                }
            } catch (error) {
                console.log("something is wrong", error)
            }
        })

        socket.on("getBook", async () => {
            const allBook = await Book.find()
            console.log(allBook)
            io.to(socket.id).emit("response", {
                status: 200,
                message: "data fetched successfy",
                data: allBook
            })
        })

        socket.on("updateBook", async (data) => {
            try {
                const { bookId, bookName, bookPrice } = data
                const updatedBook = await Book.findByIdAndUpdate(bookId, {
                    $set: { bookName, bookPrice }
                }, { new: true })

                io.to(socket.id).emit("response", {
                    status: 200,
                    message: "book updated successfully",
                    data: updatedBook
                })

            } catch (error) {
                io.to(socket.id).emit("response", {
                    status: 500,
                    message: "something went wrong while updating book"
                })
            }
        })

        socket.on("deleteBook", async (data) => {
            try {
                const { bookId } = data
                await Book.findByIdAndDelete(bookId)
                io.to(socket.id).emit("response", {
                    status: 200,
                    message: "book deleted successfully"
                })
            } catch (error) {
                io.to(socket.id).emit("response", {
                    status: 400,
                    message: "something went wrong while deleting book"
                })
            }
        })
    })
}).catch((err) => {
    console.log("something went wrong while connecting to the database", err)
})













// const server = app.listen(process.env.PORT, () => {
//     console.log("port is running in my world")
// })


// const io = new Server(he)
// const io = new Server(server)
// io.on("connection", (socket) => {
//     socket.on("send", (data) => {
//         if (data) {
//             io.to(socket.id).emit("response", {
//                 response: data.message
//             })
//         }
//     })

// socket.on("sendMsg",(data)=>{
//     socket.emit("res","your message has been hearing")
// })

// socket.on("sendMessage", (data) => {
//     if (data) {
//         io.to(socket.id).emit("msg", {
//             hello: data.name
//         })
//     }
// })
// socket.emit("h",{
//     hi:"hello"
// })
// console.log(socket.id)
// socket.on("sendData", (data) => {
//     console.log(data)
// })

// socket.emit("hi", {
//     he: " this is me"
// })
// socket.on("disconnect", () => {
//     console.log("user disconnected")
// })
// console.log("socket is connected successfully")
// })


