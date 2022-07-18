import { apply } from 'twind'

export const gradient = `bg-gradient-to-r from-[#ff8a00] to-[#da1b60]`;

export default {
  gradient,
  "text-gradient": apply`
    ${gradient} bg-clip-text 
    box-decoration-clone text-transparent
  `,
}
