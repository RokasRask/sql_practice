import axios from "axios";

axios.get('http://localhost:6001/read')
.then(res => {

    console.log(res.data);

});