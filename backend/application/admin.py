from django.contrib import admin

from application.models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = (
#        "id",
        "name",
        "contact_method",
        "phone",
#       "privacy_policy_agreed",
        "services",
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
            "fields": ("services",)
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
