import React,{Component} from "react";
import UserService from "../services/user.service";
import _ from "lodash";

export default class BoardAdmin extends Component{
    constructor(props){
        super(props);

        this.state={
            users  : [],
            paginateOrder : [],
            pageCount : 0,
            pages : [],
            paginatePages: [],
            currentPage : 1,
            pageSize: 10,

        };
    }

    componentDidMount(){
        UserService.getUsers().then(
            response => {
                console.log(response.data)
                this.setState({
                    users : response.data
                });
            }
        ).catch( error => {
            this.setState({
                content:(
                    error.response &&
                    error.response.data  &&
                    error.response.data.message 
                ) || error.message || error.toSring()
            });
        });
      
        
    }

    prev(){
        console.log(this.state.currentPage);
        if(this.state.currentPage > 1 && this.state.currentPage <= this.state.pageCount){
            this.setCurrentPage(this.state.currentPage-1);
            const startIndex =(this.state.currentPage-2)*this.state.pageSize;
            this.setpaginatedOrder(this.state.orders,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage-2).take(4).value()
            });
        }
    }

     next(){
        if(this.state.currentPage>0 && this.state.currentPage+1<=this.state.pageCount){
            this.setCurrentPage(this.state.currentPage+1);
            const startIndex =(this.state.currentPage)*this.state.pageSize;
            this.setpaginatedOrder(this.state.orders,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage).take(4).value()
            })
        }
    }

    pagination(pageNum){
        this.setCurrentPage(pageNum);
        const startIndex =(pageNum-1)*this.state.pageSize;
        this.setpaginatedOrder(this.state.orders,startIndex);
        this.setState({
            paginatePages:_(this.state.pages).slice(pageNum-1).take(4).value()
        })
    }
    
    setCurrentPage(pageNum){
        this.setState({currentPage: pageNum});
    }

    setpaginatedOrder(data,start){
        this.setState({paginateOrder: _(data).slice(start).take(this.state.pageSize).value() });
    }

    render(){
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}