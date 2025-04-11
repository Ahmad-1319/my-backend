const Todo = require('../../models/todo');
const addTodo= async (req,res)=>{
    try {
        const {title,important,checked} = req.body;
        let todo = new Todo({
            title,
            important,
            checked,
            user:req.user.id
        })
        todo.save().then(()=>{
            res.status(200).json({status:1, message:"Todo added successfully",todo})
        }).catch((e)=>{
            res.status(400).json({error:e,msg:"Some error occured"})
        })}catch (error) {
            console.log(error.message)
            res.status(500).send('Internal Server Error');   
        }
    } 

    const getTodo = async (req,res)=>{
        const allTodo = await Todo.find({user:req.user.id})
        if(allTodo.length === 0){
            return res.status(400).json({status:1,Msg:"The User have no todos yet :("})
        }
        res.status(200).json({allTodos:allTodo})
    }
    const deleteTodo = async (req,res)=>{
        const {id} = req.params
        const delTodo = await Todo.deleteOne({_id:id})
        if (!delTodo){
            return res.status(400).json({status:0,Msg:"No such todo found"})
        }
        res.status(200).json({status:1,Msg:"Todo deleted successfully",delTodo})
    }
    const updateTodo = async (req,res)=>{
        try {
            const {id} = req.params
            const {title,important} = req.body
            const updatedTodo = {
                title,
               important
            }
    
            const updateTodo = await Todo.updateOne({_id:id},updatedTodo)
            if (!updateTodo){
                return res.status(400).json({status:0,Msg:"No such todo found"})
            }
            res.status(200).json({status:1,Msg:"Todo updated successfully",updateTodo})
            
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Internal Server Error');
            
        }
    }

    const updateCheckedStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { checked } = req.body; // Only get checked status
    
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { checked }, // Only update checked status
                { new: true } // Return updated document
            );
    
            if (!updatedTodo) {
                return res.status(404).json({ status: 0, message: "Todo not found" });
            }
    
            res.status(200).json({ status: 1, message: "Checked status updated", updatedTodo });
    
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ status: 0, message: "Internal Server Error" });
        }
    };
    const updateImportantStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const {important } = req.body; // Only get checked status
    
            const updatedTodo = await Todo.findByIdAndUpdate(
                id,
                { important }, // Only update checked status
                { new: true } // Return updated document
            );
    
            if (!updatedTodo) {
                return res.status(404).json({ status: 0, message: "Todo not found" });
            }
    
            res.status(200).json({ status: 1, message: "Marked as important successfully", updatedTodo });
    
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ status: 0, message: "Internal Server Error" });
        }
    };
    
    module.exports={addTodo,getTodo,deleteTodo,updateTodo,updateCheckedStatus,updateImportantStatus}