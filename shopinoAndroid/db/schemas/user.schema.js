var userSchema=
{
    name:'User',
    properties:{
        username:{type:'string',primaryKey:true},
        fname:'string',
        lname:'string',
        type:'Type', //1.admin 2.anbardar 3.accounter 4.seller
        email:{type:'string',indexed:true},
        password_hash:'string',
        created_at:{type:'date',default:Date.now()},
        access_token:'string'
    }
}

export default userSchema