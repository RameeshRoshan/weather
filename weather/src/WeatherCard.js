import React from 'react';
import WeatherTile from './WeatherTile';


class WeatherCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            display: false
        }
    }

    onsubmit=(e)=>{
        e.preventDefault();
        let input=document.getElementById("cityname").value;
        let list = JSON.parse(localStorage.getItem("list"));
        list.push(input);
        localStorage.setItem("list",JSON.stringify(list));
        Promise.all(list.map((city,i)=>{
            return(
                fetch(`https://api.weatherapi.com/v1/current.json?key=2179903f2c2940eb89b202319211306&q=${city}&aqi=no`)
                .then(response=>{
                    return response.json();
                })
                .catch(err=>{
                    console.log(err.message);
                })
            );
        }))
        .then(res=>{
            let n=(res.length);
            if(res[n-1].error){
                list.pop(); 
                window.alert("Enter a valid City");
                localStorage.setItem("list", JSON.stringify(list));
            }
            this.setState({data : res}, ()=>{ if(list.length)this.setState({display : true})});
        })
        document.getElementById("cityname").value="";
    }

    deleteCity=(idx)=>{
        let list = JSON.parse(localStorage.getItem("list"));
        let filteredlist= list.filter((item,i)=>{
            return i!==idx;
        });
        localStorage.setItem("list",JSON.stringify(filteredlist));
        let arr=this.state.data;
        let filteredarr=arr.filter((item,i)=>{
            return i!==idx;
        });
        this.setState({data: filteredarr});
    }


    componentDidMount(){
        let list = JSON.parse(localStorage.getItem("list"));
        list.push("bangalore");
        list.push("mumbai");
        localStorage.setItem("list",list);
        console.log(list);
        if(list.length>0){
            Promise.all(list.map((city,i)=>{ //wrap in ternary
                return(
                    fetch(`https://api.weatherapi.com/v1/current.json?key=2179903f2c2940eb89b202319211306&q=${city}&aqi=no`)
                    .then(response=>{
                        return response.json();
                    })
                );
            }))
            .then(res=>{
                this.setState({data : res}, ()=>{ if(list.length)this.setState({display : true})});
            })
        }
    }

    render(){
        return(
            <>
                <div id="main" >
                    <form id="heading" onSubmit={this.onsubmit}>
                        <h1 >Live Weather</h1>
                        <span>Enter city name: </span><input id="cityname" type="text" />
                    </form>
                    <div id="tiles">
                        {
                            (this.state.display)? 
                                this.state.data.map((city,i)=>{
                                    if(!city.error) return <WeatherTile key={i} deletecity={this.deleteCity} city={city} idx={i}/>
                                })
                            :  <></>
                        }
                    </div>
                </div>
                <div id="sign"><span><a href="https://github.com/RameeshRoshan"><svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a></span></div>
            </>
        )
    }
}

export default WeatherCard;