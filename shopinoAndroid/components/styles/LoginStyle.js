import {colors,textShadow} from './mutual'
export default LoginStyles = {
    container:{        
        flex:1,
        justifyContent:'center',
        paddingRight:32,
        paddingLeft:32
    },
    image:{
        alignSelf:'center',
        marginBottom:32
    },
    username:{        
        paddingBottom:8,
    },
    password:{
        paddingBottom:32
    },
    button:{
        backgroundColor:'white'
    },
    buttonText:{
        fontFamily:'iransans',
        fontSize:16,
        color:colors.primary        
    },
    icon:{
        color:'white'
    },
    error:{
        alignSelf:'center',
        paddingBottom:32,
        color:colors.accent
    }
};