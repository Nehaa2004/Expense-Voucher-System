const login = async () => {

    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );


    const data = await response.json();

    console.log(data);

    alert(data.message);


    if(data.token){
        window.location.href="/EmployeeDashboard";
    }

};