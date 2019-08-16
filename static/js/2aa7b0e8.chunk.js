(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{526:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default="⍝ Conway's game of life\n\n⍝ This example was inspired by the impressive demo at\n⍝ http://www.youtube.com/watch?v=a9xAKttWgP4\n\n⍝ Create a matrix:\n⍝     0 1 1\n⍝     1 1 0\n⍝     0 1 0\ncreature ← (3 3 ⍴ ⍳ 9) ∈ 1 2 3 4 7   ⍝ Original creature from demo\ncreature ← (3 3 ⍴ ⍳ 9) ∈ 1 3 6 7 8   ⍝ Glider\n\n⍝ Place the creature on a larger board, near the centre\nboard ← ¯1 ⊖ ¯2 ⌽ 5 7 ↑ creature\n\n⍝ A function to move from one generation to the next\nlife ← {∨/ 1 ⍵ ∧ 3 4 = ⊂+/ +⌿ 1 0 ¯1 ∘.⊖ 1 0 ¯1 ⌽¨ ⊂⍵}\n\n⍝ Compute n-th generation and format it as a\n⍝ character matrix\ngen ← {' #'[(life ⍣ ⍵) board]}\n\n⍝ Show first three generations\n(gen 1) (gen 2) (gen 3)\n"}}]);