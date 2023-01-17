const Helpers = {
  verifyType(title: string, description: string, id_user: number) {
    if (title && description && id_user) {
      return true
    } else {
      return false
    }
  },
  verifyTypeUser(
    name: string,
    age: string,
    sex: string,
    city: string,
    email: string,
    password: string,
  ) {
    if (name && age && sex && city && email && password) {
      return true
    } else {
      return false
    }
  },
}

export default Helpers
