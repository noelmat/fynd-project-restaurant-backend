const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "OrderItem"}],
        required: true
    },
    status: {
        type: String,
        enum: ['received', 'in-progress','dispatched','completed'],
        default: 'received',
        required: true   
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
}, {
    timestamps: true
})

orderSchema.post('save', (doc)=>{
    global.ordermanagement.onSave.emit('event:updated', doc);
})

mongoose.model('Order', orderSchema);