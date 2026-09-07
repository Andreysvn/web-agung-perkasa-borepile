filepath = "public/css/modern-harga.css"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the aggressive !important overrides that destroy the original Navbar and Footer gradients
# The overrides are at the top of the MODERN DRAFT section (where I pasted modern-draft-arsip.css)
# We will just regex remove the whole NAVBAR and FOOTER section from the appended draft

# It starts around /* 2. NAVBAR (Deep Navy, White Text) */ 
# Let's just remove everything from /* 2. NAVBAR to /* 3. HERO & PAGE META */ 
# WAIT, no, the appended draft doesn't have 2. NAVBAR. 
# The appended draft has:
# .nav-menu { background: var(--brand-primary) !important; }
# .nav-menu a { color: #f8fafc !important; font-weight: 500 !important; }
# .nav-menu a:hover { color: var(--brand-accent) !important; background: rgba(255,255,255,0.05) !important; }
# .footer { background: var(--brand-primary) !important; border-top: none !important; ... }
# .footer-grid { ... }

import re

# Remove .nav-menu !important overrides
content = re.sub(r'\.nav-menu\s*\{[^}]*!important[^}]*\}', '', content)
content = re.sub(r'\.nav-menu a\s*\{[^}]*!important[^}]*\}', '', content)
content = re.sub(r'\.nav-menu a:hover\s*\{[^}]*!important[^}]*\}', '', content)

# Remove .navbar and .navbar.shrink !important overrides
content = re.sub(r'\.navbar\s*\{[^}]*!important[^}]*\}', '', content)
content = re.sub(r'\.navbar\.shrink\s*\{[^}]*!important[^}]*\}', '', content)

# Remove .footer !important overrides
content = re.sub(r'\.footer\s*\{[^}]*!important[^}]*\}', '', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up CSS !important overrides!")
