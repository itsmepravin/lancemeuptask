# @[Live](https://lancemeuptask.vercel.app/login)

### Issue 1: MongoDB keeps on displaying stale data, works fine in development mode

### Fixed the issue by changing getStaticProps to getServerSideProps.

## About this project

This is a project I created for the application of role "Remote React Internship" for the company [Lanceme Up](https://www.linkedin.com/company/lanceme-up/). The provided days were 4 (Nov 7 2022 - Nov 11 2022). The provided task details can be found [here](https://docs.google.com/document/d/1s9vq8AGii-7oh-9_WoAjMOC0Ow-wErFsYlZvUJjyte8/edit).

## Project Details

1. Made from NextJS, MongoDB, BootStrap 5 and SASS.
2. Login Form and Register Form have validation checks using regular expressions.
3. Customization has been done for better UI using SASS on BootStrap.
   This is especially visible in Login, Register and Dashboard page clearly.
4. Normal User is redirected to products page and Admin User is redirected to dashboard page.
5. Inside cart page, normal user can add items to the cart, and the individual item total and grand total price is dynamically calculated. User can add, delete item or increase the quantity of a said item dynamically.
6. Inside dashboard page, admin user can add new products, delete items and search through all products using 3 filter categories.
7. Pagination could not be implemented because of time constraints.

## Nov 16 Commit

1. Added typescript to the project and converted some code to TS. See /pages/api and /context.
2. Star Rating Component shows dynamically now and does not causes build error on Vercel.

## About Me

If you would like to contact me, all my contact details can be found inside [my portfolio website](https://pravin-singh.netlify.app/).
