function Profile() {
    if(!localStorage.getItem('auth-token')) {
        window.location.replace('/login');
    }
    else {
        return (
            <>Profile!</>
        );
    }
}

export default Profile;