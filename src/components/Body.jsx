import Card from './Card'

export default function Body(props){
    console.log(props.items,'rrrrr')
    if(!props.items || props.items.length==0){
        props.itemLoader.loadAllItems()
        console.log('no items to show!')
    }
    let cards = props.items.map((item)=>{
        if(item.title)
        {return(
            <Card item={item} action={props.action}/>
        )}else return(<></>)
    })
    return(
        <div>Body<br/>
            {cards}
        </div>
    )
}