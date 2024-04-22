function getStatusColor(status) {
    switch (status.toString().toLowerCase()) {
        case 'pending':
            return 'orange';
        case 'progress':
            return 'blue';
        case 'completed':
            return 'green';
        case 'cancelled':
            return 'red';
        default:
            return 'black'; // Default color
    }
}

export default getStatusColor ;