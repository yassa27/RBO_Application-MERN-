module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        bookTitle: String,
        bookAuthor: String,
        bookType: String,
        requested: Boolean,
        allocated: Boolean,
        approved: Boolean,
        user: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
      }],
    },
      { timestamps: true },
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Purchaserequest = mongoose.model("purchaserequest", schema);
    return Purchaserequest;
  };