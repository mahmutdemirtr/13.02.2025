import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import requests
import pickle

def load_cookies(driver, cookies_path):
    """Load cookies into the browser."""
    try:
        with open(cookies_path, "rb") as file:
            cookies = pickle.load(file)
            for cookie in cookies:
                driver.add_cookie(cookie)
        print("Cookies loaded successfully.")
    except Exception as e:
        print(f"Error loading cookies: {e}")


def save_cookies(driver, cookies_path):
    """Save cookies from the browser."""
    try:
        cookies = driver.get_cookies()
        with open(cookies_path, "wb") as file:
            pickle.dump(cookies, file)
        print("Cookies saved successfully.")
    except Exception as e:
        print(f"Error saving cookies: {e}")


def login_with_credentials(driver, username, password):
    """Log in to Instagram using username and password."""
    insta_url = "https://www.instagram.com/"
    driver.get(insta_url)

    try:
        # Wait for the login fields to appear
        username_field = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        username_field.send_keys(username)

        password_field = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.NAME, "password"))
        )
        password_field.send_keys(password)

        login_button = WebDriverWait(driver, 15).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
        )
        login_button.click()

        # Wait for the homepage to load
        print("Logged in successfully.")
        return True
    except Exception as e:
        print(f"Error logging in: {e}")
        return False

def perform_login():
    load_dotenv(dotenv_path='.env', override=True)
    USERNAME = 'latfiah9'
    PASSWORD = 'Aa121211234?'

    if not USERNAME or not PASSWORD:
        raise ValueError("Username or password not found in environment variables")

    cookies_path = 'cookies.pkl'
    try:
        # Set Chrome options
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        # options.add_argument(f'--proxy-server=http://{proxy}')

        service = ChromeService(ChromeDriverManager().install())

        # Initialize the Chrome driver with the service
        driver = webdriver.Chrome(service=service, options=options)

    # Attempt to use cookies
        cookies_used = False
        if os.path.exists(cookies_path):
            driver.get("https://www.instagram.com/")
            load_cookies(driver, cookies_path)
            driver.refresh()

            # Verify if cookies worked
            try:
                print("Logged in using cookies.")
                cookies_used = True
            except Exception:
                print("Cookies did not work. Falling back to username/password login.")

        # Use username/password login if cookies were not valid
        if not cookies_used:
            if not login_with_credentials(driver, USERNAME, PASSWORD):
                driver.quit()
                return None
            save_cookies(driver, cookies_path)
    except Exception as e:
        print(f"Error occurred while fetching user data: {e}")
        return None
    return driver

def fetch_user(username):
    """
        Fetch user profile informations.
    """

    driver = perform_login()
    # Navigate to the user's profile page
    driver.get(f'https://www.instagram.com/{username}')

    values = {}

    try:
        # Scraping profile data (followers, following, etc.)
        ul = WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.TAG_NAME, 'ul')))
        items = ul.find_elements(By.TAG_NAME, 'li')
        
        for li in items:
            values[li.text.split(' ')[1]] = li.text.split(' ')[0]

        # Get the profile image URL
        profile_image_element = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'img[alt*="profile picture"]'))
        )
        profile_image_url = profile_image_element.get_attribute('src')
        values['profile_image_url'] = profile_image_url
        print(values)

        full_name_elements = driver.find_elements(By.XPATH, "//header/section[2]/div/div[1]/div[1]/div/a/h2/span")

        if full_name_elements:
            full_name = full_name_elements[0].text
            if full_name:
                values['full_name'] = full_name
            username_element = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.XPATH, "//header//section[2]//a/h2/span"))
            )
            username = username_element.text
            values['username'] = username
            print(values)
        else:
            values['full_name'] = ''
            username_element = WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.XPATH, "//section/main//header/section[2]//a/h1/span"))
            )
            username = username_element.text
            values['username'] = username
            print(values)


    except Exception as e:
        print(f"Error occurred while scraping profile data for {username}: {e}")
        return None

    driver.quit()

    return values

def save_profile_image(image_url, username):
    try:
        response = requests.get(image_url, stream=True)
        if response.status_code == 200:
            # Save the image locally
            file_path = f'static/profile_images/{username}.jpg'
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            return file_path
        else:
            print(f"Failed to fetch the image for {username}, status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error occurred while downloading the image for {username}: {e}")
        return None
