// script.js
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const location = document.getElementById('location').value;
    const interests = document.getElementById('interests').value;
    const profilePicture = document.getElementById('profilePicture').files[0];

    if (!name || !age || !gender || !location || !interests || !profilePicture) {
        alert('Please fill out all fields.');
        return;
    }

    if (!profilePicture.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }

    document.getElementById('successMessage').classList.remove('hidden');
});