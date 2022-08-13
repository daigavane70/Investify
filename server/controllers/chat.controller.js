
const testRoute = (req , res)=>{
    return res.json({name: req.name})
}
module.exports = {testRoute}