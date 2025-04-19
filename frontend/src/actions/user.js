import axios from "@/helpers/axios";

export async function signup(user) {
    const valid = isValidData(user);
    if (valid.error) {
        throw valid;
    }

    const data = await axios('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (data.error) {
        throw data;
    }
    return data;
};

export async function login(user) {
    // const valid = isValidData(user);
    // if (valid.error) {
    //     throw valid;
    // }

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await res.json();
    if (data.error) {
        throw data;
    }
    return data;
};

export default async function me(signal) {
    const data = await axios('/api/auth/me', { signal });

    if (data.error) {
        throw data;
    }
    return data;
}

function isValidData(obj) {
    let valid = { error: false }
    let { password: pass } = obj;
    if (obj.fullName.length < 3) {
        valid.error = true;
        valid.fullName = 'Enter Your Name Correctly.';
    }
    if (obj.email.length < 6 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email))) {
        valid.error = true;
        valid.email = 'Please Enter email correctly.';
    }
    if (
        pass.search(/[A-Z]/) === -1 ||
        pass.search(/[a-z]/) === -1 ||
        pass.search(/[0-9]/) === -1 ||
        pass.search(/[`~!@#$%^&*)(?.><]/) === -1 ||
        pass.length < 8
    ) {
        valid.error = true;
        valid.password = 'Enter a strong password.';
    }
    return valid;
}