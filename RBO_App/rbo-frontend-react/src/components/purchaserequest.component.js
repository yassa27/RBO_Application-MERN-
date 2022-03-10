import React, { Component } from "react";
import PurchaseRequestService from "../services/purchaseRequest.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBookauthor = this.onChangeBookauthor.bind(this);
    this.onChangeBooktype = this.onChangeBooktype.bind(this);
    this.getPurchaserequest = this.getPurchaserequest.bind(this);
    this.updateRequested = this.updateRequested.bind(this);
    this.updatePurchaserequest = this.updatePurchaserequest.bind(this);
    this.deletePurchaserequest = this.deletePurchaserequest.bind(this);

    this.state = {
      currentPurchaserequest: {
        id: null,
        bookTitle: "",
        bookAuthor: "",
        bookType: "",
        requested: false,
        allocated: false,
        approved: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPurchaserequest(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const booktitle = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPurchaserequest: {
          ...prevState.currentPurchaserequest,
          bookTitle: booktitle
        }
      };
    });
  }

  onChangeBookauthor(e) {
    const bookauthor = e.target.value;
    
    this.setState(prevState => ({
      currentPurchaserequest: {
        ...prevState.currentPurchaserequest,
        bookAuthor: bookauthor
      }
    }));
  }
  onChangeBooktype(e) {
    const booktype = e.target.value;
    
    this.setState(prevState => ({
      currentPurchaserequest: {
        ...prevState.currentPurchaserequest,
        bookType: booktype
      }
    }));
  }

  getPurchaserequest(id) {
    PurchaseRequestService.get(id)
      .then(response => {
        this.setState({
          currentPurchaserequest: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRequested(status) {
    var data = {
      id: this.state.currentPurchaserequest.id,
      title: this.state.currentPurchaserequest.bookTitle,
      bookauthor: this.state.currentPurchaserequest.bookAuthor,
      booktype: this.state.currentPurchaserequest.bookType,
      requested: status
    };

    PurchaseRequestService.update(this.state.currentPurchaserequest.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPurchaserequest: {
            ...prevState.currentPurchaserequest,
            requested: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePurchaserequest() {
    PurchaseRequestService.update(
      this.state.currentPurchaserequest.id,
      this.state.currentPurchaserequest
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The purchase request was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePurchaserequest() {    
    PurchaseRequestService.delete(this.state.currentPurchaserequest.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/purchaserequests')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPurchaserequest } = this.state;

    return (
      <div>
        {currentPurchaserequest ? (
          <div className="edit-form">
            <h4>Purchase Request</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="booktitle"
                  value={currentPurchaserequest.booktitle}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bookauthor">Book Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="bookauthor"
                  value={currentPurchaserequest.bookauthor}
                  onChange={this.onChangeBookauthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="booktype">Book Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="booktype"
                  value={currentPurchaserequest.booktype}
                  onChange={this.onChangeBooktype}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPurchaserequest.requested ? "Requested" : "Pending"}
              </div>
            </form>

            {currentPurchaserequest.requested ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateRequested(false)}
              >
                UnRequest
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateRequested(true)}
              >
                Request
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePurchaserequest}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePurchaserequest}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Purchase Request...</p>
          </div>
        )}
      </div>
    );
  }
}