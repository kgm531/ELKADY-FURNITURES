import os

# المسار إلى المجلد (نحتفظ بالصيغة الأصلية لكن نحول لاحقًا إلى /)
folder_path = r"img\وحدات_التلفزيون"

# الامتدادات المسموحة
image_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".gif")


# دالة للترتيب الطبيعي للأسماء مثل 1، 1.1، 1.2، 2، 2.1 ...
def natural_key(filename):
    name, _ = os.path.splitext(filename)
    return [
        float(part) if part.replace(".", "", 1).isdigit() else part
        for part in name.split(".")
    ]


# استخراج الصور وترتيبها
images = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]
images.sort(key=natural_key)

# حفظ النتائج في ملف نصي
with open("image_paths.txt", "w", encoding="utf-8") as f:
    for filename in images:
        # إنشاء المسار الكامل وتحويله ليستخدم الشرط المائل /
        full_path = os.path.abspath(os.path.join(folder_path, filename)).replace(
            "\\", "/"
        )
        name, ext = os.path.splitext(filename)
        line = f"{full_path} | Name: {name} | Extension: {ext}"
        f.write(line + "\n")

print("✅ تم حفظ المسارات مرتبة وباستخدام '/' في ملف image_paths.txt.")
