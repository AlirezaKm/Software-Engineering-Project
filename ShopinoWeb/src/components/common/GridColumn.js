import React, {Component} from 'react'
import {Grid,Segment,Label,Icon,Rail} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
let timer=null;
const GridColumn = 
    ({children,three,title,icon,ItemOne,ItemTwo,badgeTop,badgeBottom,onPress,onLongPress,to})=>
        <Grid.Column computer={three?"5":"4"} tablet="8" mobile="16">
        <div onMouseDown={()=>{
            timer = setTimeout(()=>onLongPress(),500)}
        } 
        onMouseUp={
            ()=>clearTimeout(timer)
        }>
            <Segment color="purple">
                <Link to={to}>
                <Label color="purple" attached="top left">
                    {badgeTop}
                </Label>                
                <Label color="yellow" attached="bottom left">
                    {badgeBottom}
                </Label>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width="9">
                        <Icon name={icon} color="purple"/>
                            {' '+title}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                         <Grid.Column width="7">
                            <Icon name="chevron left" size="small"/>
                            {ItemOne}
                        </Grid.Column>
                        <Grid.Column width="5">
                        {ItemTwo&&
                            <span>
                                <Icon name="chevron left" size="small"/>
                                {ItemTwo}
                            </span>
                        }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Link>
            </Segment>
            </div>
        </Grid.Column>

export default GridColumn;