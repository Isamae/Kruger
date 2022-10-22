import React,{Component} from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import _ from "lodash";

export default class BoardAdmin extends Component{
    constructor(props){
        super(props);

        this.state={
            users  : [],
            paginateUser : [],
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
                    pageCount: this.state.users? Math.ceil(this.state.users.length/this.state.pageSize): 0
                })

                if(this.state.pageCount!==1){
                    this.setState({
                        pages:_.range(1,this.state.pageCount+1)
                    })
                    this.setState({
                        paginatePages:_(this.state.pages).slice(this.currentPage).take(4).value()
                    })
                }

                this.setpaginatedOrder(this.state.users, 0);
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
            this.setpaginatedOrder(this.state.users,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage-2).take(4).value()
            });
        }
    }

     next(){
        if(this.state.currentPage>0 && this.state.currentPage+1<=this.state.pageCount){
            this.setCurrentPage(this.state.currentPage+1);
            const startIndex =(this.state.currentPage)*this.state.pageSize;
            this.setpaginatedOrder(this.state.users,startIndex);
            this.setState({
                paginatePages:_(this.state.pages).slice(this.state.currentPage).take(4).value()
            })
        }
    }

    pagination(pageNum){
        this.setCurrentPage(pageNum);
        const startIndex =(pageNum-1)*this.state.pageSize;
        this.setpaginatedOrder(this.state.users,startIndex);
        this.setState({
            paginatePages:_(this.state.pages).slice(pageNum-1).take(4).value()
        })
    }

    setCurrentPage(pageNum){
        this.setState({currentPage: pageNum});
    }

    setpaginatedOrder(data,start){
        this.setState({paginateUser: _(data).slice(start).take(this.state.pageSize).value() });
    }

    render(){
        return (
            <div className="container">
                <div className="d-flex flex-row"><h1> users</h1></div>
                <div className="d-flex flex-row-reverse mb-4">
                    <Link
                        to={"/edit/user/"+"new"}
                    >
                        <button type="button" className="btn btn-primary">Create User</button>
                    </Link>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                    <td><strong>No</strong></td>
                                    <td><strong>CI</strong></td>
                                    <td><strong>Names</strong></td>
                                    <td><strong>Lastname</strong></td>
                                    <td><strong>Email</strong></td>
                                    <td><strong>Vaccinated</strong></td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.paginateUser.map(
                                        (user,index) =>
                                        <tr key = {user.id}>
                                            <td>{index}</td>
                                            <td>{user.ci}</td>
                                            <td>{user.name}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.vaccinated}</td>
                                            <td>
                                                <Link
                                                    to={"/edit/user/"+user.id}
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