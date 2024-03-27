class UnsafeUser {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  /* This method will be called when the object is converted to a string */
  toString() {
    return `User(${this.id}, ${this.name}, ${this.email}, ${this.password})`;
  }

  /* This method will be called when the object is converted to a JSON */
  toJSON() {
    return {
      user_id: this.id,
      user_name: this.name,
      user_email: this.email,
      user_password: this.password,
    };
  }
}

class SafeUser {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toString() {
    return `User(${this.id})`;
  }

  toJSON() {
    return {
      user_id: this.id,
    };
  }
}

const unsafeUser = new UnsafeUser(
  123,
  "John",
  "john@example.com",
  "sensitive-password"
);
const safeUser = new SafeUser(
  123,
  "John",
  "john@example.com",
  "sensitive-password"
);

// This will print the password in the console!
console.log(`Unsafe user string: ${unsafeUser}`);
console.log(`Unsafe user JSON: ${JSON.stringify(unsafeUser)}`);
// This will print the user id only
console.log(`Safe user string: ${safeUser}`);
console.log(`Safe user JSON: ${JSON.stringify(safeUser)}`);
