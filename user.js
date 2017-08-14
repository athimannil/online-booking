export function User() {

    this.getUsers = getUsers;

    function getUsers() {
        return [{
            userId: '101',
            name: 'Hardik Kaji',
            city: 'Surat'
        }, {
            userId: '102',
            name: 'Dhaval Patel',
            city: 'Ahmedabad'
        }]
    }
}
