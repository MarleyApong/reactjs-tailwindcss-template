/**
 * Test des fonctions de normalisation pascalCase et camelCase
 * Pour valider tous les formats de noms de fichiers possibles
 */

function pascalCase(str: string): string {
  // Convertir un nom de fichier en PascalCase pour le nom de composant
  // Règle simple : séparer sur les délimiteurs, puis PascalCase chaque mot
  
  // Séparer sur les délimiteurs courants : -, _, ., espaces
  return str
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function camelCase(str: string): string {
  // Convertir en camelCase (première lettre en minuscule)
  const pascal = pascalCase(str)
  if (!pascal) return ''
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

// Tests
const testCases = [
  // Kebab-case
  { input: 'user-profile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  { input: 'my-super-component', expectedPascal: 'MySuperComponent', expectedCamel: 'mySuperComponent' },
  
  // Snake_case
  { input: 'user_profile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  { input: 'my_super_component', expectedPascal: 'MySuperComponent', expectedCamel: 'mySuperComponent' },
  
  // PascalCase (préservé)
  { input: 'UserProfile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  { input: 'MySuperComponent', expectedPascal: 'MySuperComponent', expectedCamel: 'mySuperComponent' },
  { input: 'ApiHandler', expectedPascal: 'ApiHandler', expectedCamel: 'apiHandler' },
  { input: 'XMLParser', expectedPascal: 'XMLParser', expectedCamel: 'xMLParser' },
  
  // camelCase  
  { input: 'userProfile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  { input: 'mySuperComponent', expectedPascal: 'MySuperComponent', expectedCamel: 'mySuperComponent' },
  { input: 'apiHandler', expectedPascal: 'ApiHandler', expectedCamel: 'apiHandler' },
  
  // Espaces
  { input: 'user profile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  { input: 'my super component', expectedPascal: 'MySuperComponent', expectedCamel: 'mySuperComponent' },
  
  // Points
  { input: 'user.profile', expectedPascal: 'UserProfile', expectedCamel: 'userProfile' },
  
  // Mélanges complexes
  { input: 'user-profile_v2', expectedPascal: 'UserProfileV2', expectedCamel: 'userProfileV2' },
  { input: 'my_super-component.v3', expectedPascal: 'MySuperComponentV3', expectedCamel: 'mySuperComponentV3' },
  { input: 'API_handler-v2', expectedPascal: 'APIHandlerV2', expectedCamel: 'aPIHandlerV2' },
  
  // Cas simples
  { input: 'user', expectedPascal: 'User', expectedCamel: 'user' },
  { input: 'USER', expectedPascal: 'USER', expectedCamel: 'uSER' },
]

console.log('🧪 Tests de normalisation des noms\n')
console.log('=' .repeat(80))

let passed = 0
let failed = 0

testCases.forEach(({ input, expectedPascal, expectedCamel }) => {
  const resultPascal = pascalCase(input)
  const resultCamel = camelCase(input)
  
  const pascalOk = resultPascal === expectedPascal
  const camelOk = resultCamel === expectedCamel
  
  if (pascalOk && camelOk) {
    passed++
    console.log(`✅ "${input}"`)
    console.log(`   PascalCase: ${resultPascal}`)
    console.log(`   camelCase:  ${resultCamel}`)
  } else {
    failed++
    console.log(`❌ "${input}"`)
    if (!pascalOk) {
      console.log(`   PascalCase: ${resultPascal} (attendu: ${expectedPascal})`)
    }
    if (!camelOk) {
      console.log(`   camelCase:  ${resultCamel} (attendu: ${expectedCamel})`)
    }
  }
  console.log('')
})

console.log('=' .repeat(80))
console.log(`\n📊 Résultats: ${passed}/${testCases.length} tests réussis`)
if (failed > 0) {
  console.log(`   ⚠️  ${failed} test(s) échoué(s)`)
  process.exit(1)
} else {
  console.log(`   🎉 Tous les tests sont passés !`)
}
