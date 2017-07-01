import React from 'react'
import { Grid} from 'semantic-ui-react'
import AuthFormContainer from '../Authenticate/AuthFormContainer'


const HomePage = ({background}) => {

    const HomePageStyle={
        background:`url(${background})`,
        backgroundRepeat:'no-repeat',      
        overflow:'auto'
    };

    return (
        <Grid padded style={HomePageStyle} centered>        
            <Grid.Column computer="6" mobile="14" tablet="14">
                <AuthFormContainer widths="1"/>
            </Grid.Column>
        </Grid>
    )
};

export default HomePage;