import React,{Component} from "react";
import { Link } from "react-router-dom";
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
                this.setState({
                    pageCount: this.state.orders? Math.ceil(this.state.orders.length/this.state.pageSize): 0
                })

                if(this.state.pageCount!==1){
                    this.setState({
                        pages:_.range(1,this.state.pageCount+1)
                    })
                    this.setState({
                        paginatePages:_(this.state.pages).slice(this.currentPage).take(4).value()
                    })
                }

                this.setpaginatedOrder(this.state.orders, 0);
                this.setCurrentPage(1);
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
                <div className="d-flex flex-row"><h1> Orders</h1></div>
                <div className="d-flex flex-row-reverse mb-4">
                    <Link
                        to={"/orders/order"}
                    >
                        <button type="button" className="btn btn-primary">Create Order</button>
                    </Link>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><strong>No</strong></td>
                                    <td><strong>Costumer</strong></td>
                                    <td><strong>Status</strong></td>
                                    <td><strong>Date</strong></td>
                                    <td><strong>Total</strong></td>
                                    <td><strong>Actions</strong></td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.paginateOrder.map(
                                        order =>
                                        <tr key = {order._id}>
                                            <td>{order.order_number}</td>
                                            <td>{order.consumer.name}</td>
                                            <td>{order.order_status}</td>
                                            <td>{order.order_date}</td>
                                            <td>{order.total_amount}</td>
                                            <td>
                                                <Link
                                                    to={"/orders/order/"+order._id}
                                                >
                                                    Edit
                                                </Link>

                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <nav className="d-flex justify-content-right">
                    <ul className="pagination">
                        {
                             <li  onClick={()=>this.prev()} id="prev">
                                <p className="page-link">Prev </p>
                            </li>
                        }
                        {
                           
                            this.state.paginatePages.map((page) => (
                                <li 
                                    className={
                                        page===this.state.currentPage? "page-item active":"page-item"
                                    }
                                    id={page}
                                    onClick={()=>this.pagination(page)}

                                >
                                    <p className="page-link"
                                    >{page} </p>
                                </li>
                            ))
                        }
                        {
                            <li  onClick={()=>this.next()} id="next">
                                <p className="page-link">Next </p>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        );
    }
}