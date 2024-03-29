import React, { Component } from "react";
import PurchaserequestDataService from "../services/purchaseRequest.service";

export default class AddPurchaseRequest extends Component {
  //initialisation
  constructor(props) {
    super(props);
    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
    this.onChangeBookType = this.onChangeBookType.bind(this);
    this.savePurchaseRequest = this.savePurchaseRequest.bind(this);
    this.newPurchaseRequest = this.newPurchaseRequest.bind(this);

    this.state = {
      id: null,
      bookTitle: "",
      bookAuthor: "", 
      bookType: "",

      requested: false,
      allocated: false,
      approved: false,
      submitted: false
    };
  }
  //Reading user input to pass to database
  onChangeBookTitle(e) {
    this.setState({
      bookTitle: e.target.value
    });
  }

  onChangeBookAuthor(e) {
    this.setState({
        bookAuthor: e.target.value
    });
  }

  onChangeBookType(e) {
    this.setState({
        bookType: e.target.value
    });
  }
//add purchaserequest to rbodb, purchaserequest collection
  savePurchaseRequest() {
    var data = {
      bookTitle: this.state.bookTitle,
      bookAuthor: this.state.bookAuthor,
      bookType: this.state.bookType,
    };

    PurchaserequestDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          bookTitle: response.data.bookTitle,
          bookAuthor: response.data.bookAuthor,
          bookType: response.data.bookType,
          requested: response.data.requested,
          allocated: response.data.allocated,
          approved: response.data.approved,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPurchaseRequest() {
    this.setState({
      id: null,
      bookTitle: "",
      bookAuthor: "",
      bookType: "",
      requested: false,
      allocated: false,
      approved: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Purchase Request has been created!</h4>
            <button className="btn btn-success" onClick={this.newPurchaseRequest}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="bookTitle">Book Title</label>
              <input
                type="text"
                className="form-control"
                id="bookTitle"
                required
                value={this.state.bookTitle}
                onChange={this.onChangeBookTitle}
                name="bookTitle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookAuthor">Book Author</label>
              <input
                type="text"
                className="form-control"
                id="bookAuthor"
                required
                value={this.state.bookAuthor}
                onChange={this.onChangeBookAuthor}
                name="bookAuthor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookType">Book Type</label>
              <input
                type="text"
                className="form-control"
                id="bookType"
                required
                value={this.state.bookType}
                onChange={this.onChangeBookType}
                name="bookType"
              />
            </div>
            <br/>
            <button onClick={this.savePurchaseRequest} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}