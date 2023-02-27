import axios from 'axios'

export async function getGithubUsers() {
  return axios('https://api.github.com/users/github')
}
