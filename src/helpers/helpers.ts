const Helpers = {
  verifyType(title: string, description: string, id_user: number) {
    if (title && description && id_user) {
      return true
    } else {
      return false
    }
  },
}

export default Helpers
