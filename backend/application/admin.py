from django.contrib import admin
from django.utils.html import format_html # Импортируем для возможного форматирования, если потребуется

from application.models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_method",
        "phone",
        "display_services",  # Используем новый метод вместо прямого поля "services"
        "created_at",
        "sent_to_amocrm",
        "sent_to_telegram"
    )
    search_fields = ("name", "contact_method", "phone", "project_description")
    list_filter = (
        "sent_to_amocrm",
        "sent_to_telegram",
        "contact_method",
        "privacy_policy_agreed",
        "created_at"
    )
    readonly_fields = ("created_at", "amocrm_response", "telegram_response")
    fieldsets = (
        ("Основная информация", {
            "fields": (
                "name", "phone",
                "contact_method", "project_description"
            )
        }),
        ("Услуги", {
            "fields": ("services",) # Здесь оставляем "services", так как это поле для редактирования
        }),
        ("Согласие", {
            "fields": ("privacy_policy_agreed",)
        }),
        ("Системная информация", {
            "fields": ("created_at",)
        }),
        ("Интеграции", {
            "fields": (
                "sent_to_amocrm",
                "sent_to_telegram",
                "amocrm_response",
                "telegram_response"
            )
        }),
    )

    def display_services(self, obj):
        """
        Возвращает выбранные услуги в виде строки, разделенной запятыми.
        """
        if obj.services:
            # Если services - это ListField (или ArrayField), просто объединяем элементы
            # Если services - это ManyToManyField, используйте:
            # return ", ".join([service.name for service in obj.services.all()])
            return ", ".join(obj.services)
        return "-"

    display_services.short_description = "Выбранные услуги" # Название колонки в админке