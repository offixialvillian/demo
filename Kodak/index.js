// 1. Initialize Supabase with a unique variable name (supabaseClient)
const SUPABASE_URL = "https://raokouyxnnonpgpyehkx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BC9IA47wqE8stpu8w7t4Gw_AMCAW8PU";

// Changed 'const supabase' to 'const supabaseClient' to fix the declaration crash
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Listen for the form submission
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents page reload

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('form-message');
  const submitButton = document.getElementById('submit-btn');

  // UI State: Loading
  submitButton.disabled = true;
  submitButton.innerText = "Creating account...";
  messageElement.innerText = ""; 

  try {
    // 3. Call the updated client name here
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error; 
    }

    // // 4. Handle Success: Redirect to the next page!
    // This line tells the browser to instantly load your new details page.
    window.location.href = "details.html";
    
    document.getElementById('signup-form').reset();
    submitButton.innerText = "Account Created!";

  } catch (error) {
    // 5. Handle Errors
    messageElement.style.color = "red";
    messageElement.innerText = `Error: ${error.message}`;
    
    // Reset button
    submitButton.disabled = false;
    submitButton.innerText = "Create account";
  }
});