import {colors,textShadow} from './mutual'
export default landingStyles = {
    container:{
        backgroundColor:colors.primary,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontSize:24,
        alignSelf:'center',
        ...textShadow
    },
    logo:{
        width:128,
        height:128,
        margin:16,
        alignSelf:'center'
    },
    appName:{
        color:'white',
        alignSelf:'center',
        ...textShadow
    }
}