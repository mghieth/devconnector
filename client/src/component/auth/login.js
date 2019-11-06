import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Login } from '../../actions/auth';
const login = ({ Login, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		Login(email, password);
	};
	//redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						value={email}
						onChange={(e) => onChange(e)}
						placeholder='Email Address'
						name='email'
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						minLength='6'
					/>
				</div>
			</form>
			<p className='my-1'>
				Don`t have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	);
};
login.propTypes = {
	Login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
export default connect(mapStateToProps, { Login })(login);
