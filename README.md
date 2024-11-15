Thank you for the clarification! Here's the updated and more accurate README with the correct tech stack and security considerations:

---

# S5 Passlab

**S5 Passlab** is a native desktop password manager built with **Next.js**, **Shadcn UI**, and **Tauri**. It allows you to generate strong, unique passwords using a customizable formula and store them locally on your machine. By leveraging Tauri’s native capabilities, S5 Passlab offers enhanced security, performance, and a smooth user experience.

## Tech Stack

- **Next.js**: A React-based framework for building the user interface.
- **Shadcn UI**: A UI component library for building beautiful and functional user interfaces.
- **Tauri**: A toolkit for building native desktop applications using rust.

## Features

- **Customizable Password Generation**: Create your own password formula using personal inputs (e.g., first name, favorite number, separator) to generate strong, unique passwords.
- **Password Storage**: Store passwords on your local machine in different categories (e.g., Social Media, Email, etc.).
- **Search Functionality**: Easily search for stored passwords.
- **Dark/Light Mode**: Switch between dark and light modes for an optimized visual experience.
- **Native Desktop App**: Built with Tauri for a native desktop experience with fast performance and enhanced security.

## Security Considerations

While **S5 Passlab** is a **desktop application** and stores passwords locally, it is still important to take precautions with your sensitive information. The passwords are stored on your local machine and are not transmitted over the internet.
To further improve security, it is recommended to **encrypt your passwords** before storing them locally, and never share your password manager file. **S5 Passlab** is suitable for less critical passwords but **does not yet offer advanced encryption or cloud-based security**.


## Installation

Follow these steps to get **S5 Passlab** running on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/S5SAJID/s5_passlab
cd s5_passlab
```

### 2. Install dependencies

Make sure you have **Node.js** and **Tauri CLI** installed. You can install the necessary dependencies with the following commands:

```bash
pnpm install
```

### 3. Run the development server

To start the app in development mode:

```bash
pnpm tauri dev
```

### 4. Build and package the app with Tauri

After developing, you can build the app for your platform:

```bash
pnpm tauri build
```

This will generate a native application that can be installed and run on your machine.

## Contributing

If you’d like to contribute to **S5 Passlab**, feel free to open a pull request or report any issues you encounter. Your feedback and contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.