/**
 * Multilingual locale definitions
 * Maps actions to their translations across languages
 */

import { franc } from 'franc-ce';
import type { LocaleStrings, LanguageCode } from '../types.js';

// ISO 639-3 to ISO 639-1 mapping for franc compatibility
const LANG_CODE_MAP: Record<string, LanguageCode> = {
  // Core languages
  eng: 'en',
  swe: 'sv',
  deu: 'de',
  spa: 'es',
  fra: 'fr',
  ita: 'it',
  por: 'pt',
  nld: 'nl',
  pol: 'pl',
  // Extended European languages
  dan: 'da',
  nor: 'no',
  fin: 'fi',
  ces: 'cs',
  slk: 'sk',
  hun: 'hu',
  ron: 'ro',
  bul: 'bg',
  hrv: 'hr',
  srp: 'sr',
  slv: 'sl',
  ell: 'el',
  tur: 'tr',
  rus: 'ru',
  ukr: 'uk',
  est: 'et',
  lav: 'lv',
  lit: 'lt',
};

/**
 * Get locale strings for a specific language
 */
export const locales: Record<LanguageCode, LocaleStrings> = {
  en: {
    create: ['Created', 'Creating', 'Write', 'Writing', 'Make', 'Generate', 'Build'],
    read: ['Read', 'Reading', 'Check', 'Checking', 'View'],
    edit: ['Edit', 'Editing', 'Update', 'Updating', 'Modify', 'Modify', 'Patch'],
    delete: ['Delete', 'Deleting', 'Remove', 'Removing', 'Erase', 'Erase', 'Drop'],
    error: ['Error', 'Failed', 'Failure', 'Exception', 'Problem'],
    ok: ['OK', 'Done', 'Complete', 'Success', 'Finished'],
    pending: ['Pending', 'Processing', 'Working', 'Loading', 'In progress'],
    warning: ['Warning', 'Caution', 'Notice', 'Attention'],
  },

  sv: {
    create: ['Skapad', 'Skapar', 'Skriv', 'Skriver', 'Gör', 'Generera', 'Bygg'],
    read: ['Läst', 'Läser', 'Kolla', 'Kollar', 'Visa'],
    edit: ['Redigerad', 'Redigerar', 'Uppdatera', 'Uppdaterar', 'Ändra', 'Modifiera', 'Patch'],
    delete: ['Raderad', 'Raderar', 'Ta bort', 'Tar bort', 'Rensa', 'Radera', 'Droppa'],
    error: ['Fel', 'Misslyckades', 'Felaktighet', 'Undantag', 'Problem'],
    ok: ['OK', 'Klar', 'Färdig', 'Färdigt', 'Lyckades', 'Klart'],
    pending: ['Väntar', 'Bearbetar', 'Arbetar', 'Laddar', 'Pågår'],
    warning: ['Varning', 'Obs', 'Notering', 'Uppmärksamhet'],
  },

  de: {
    create: ['Erstellt', 'Erstelle', 'Schreibe', 'Schreiben', 'Mache', 'Generiere', 'Baue'],
    read: ['Gelesen', 'Lese', 'Prüfe', 'Prüfen', 'Zeige'],
    edit: ['Bearbeitet', 'Bearbeite', 'Aktualisiere', 'Aktualisieren', 'Ändere', 'Modifiziere', 'Patche'],
    delete: ['Gelöscht', 'Lösche', 'Entferne', 'Entfernen', 'Lösche', 'Räume', 'Entferne'],
    error: ['Fehler', 'Fehlgeschlagen', 'Fehlerhaft', 'Ausnahme', 'Problem'],
    ok: ['OK', 'Fertig', 'Abgeschlossen', 'Erfolg', 'Beendet', 'Fertiggestellt'],
    pending: ['Ausstehend', 'Verarbeite', 'Arbeite', 'Lade', 'In Bearbeitung'],
    warning: ['Warnung', 'Vorsicht', 'Hinweis', 'Achtung'],
  },

  es: {
    create: ['Creado', 'Creando', 'Escribir', 'Escribiendo', 'Hacer', 'Generar', 'Construir'],
    read: ['Leído', 'Leyendo', 'Revisar', 'Revisando', 'Ver'],
    edit: ['Editado', 'Editando', 'Actualizar', 'Actualizando', 'Modificar', 'Modificando', 'Parche'],
    delete: ['Eliminado', 'Eliminando', 'Borrar', 'Borrando', 'Limpiar', 'Destruir', 'Quitar'],
    error: ['Error', 'Falló', 'Fallido', 'Excepción', 'Problema'],
    ok: ['OK', 'Hecho', 'Completado', 'Éxito', 'Terminado', 'Finalizado'],
    pending: ['Pendiente', 'Procesando', 'Trabajando', 'Cargando', 'En progreso'],
    warning: ['Advertencia', 'Precaución', 'Aviso', 'Atención'],
  },

  fr: {
    create: ['Créé', 'Crée', 'Écrire', 'Écrivant', 'Faire', 'Générer', 'Construire'],
    read: ['Lu', 'Lisant', 'Vérifier', 'Vérifiant', 'Voir'],
    edit: ['Édité', 'Édite', 'Mettre à jour', 'Met en à jour', 'Modifier', 'Modifie', 'Patch'],
    delete: ['Supprimé', 'Supprime', 'Effacer', 'Efface', 'Nettoyer', 'Détruire', 'Retirer'],
    error: ['Erreur', 'Échoué', 'Échec', 'Exception', 'Problème'],
    ok: ['OK', 'Fait', 'Terminé', 'Succès', 'Fin', 'Complété'],
    pending: ['En attente', 'Traite', 'Travaille', 'Charge', 'En cours'],
    warning: ['Avertissement', 'Attention', 'Notification', 'Prudence'],
  },

  it: {
    create: ['Creato', 'Crea', 'Scrivi', 'Scrivendo', 'Fai', 'Genera', 'Costruisci'],
    read: ['Letto', 'Leggendo', 'Controlla', 'Controllando', 'Vedi'],
    edit: ['Modificato', 'Modifica', 'Aggiorna', 'Aggiornando', 'Cambia', 'Modificare', 'Patch'],
    delete: ['Eliminato', 'Elimina', 'Cancella', 'Cancellando', 'Pulisci', 'Distruggi', 'Rimuovi'],
    error: ['Errore', 'Fallito', 'Fallimento', 'Eccezione', 'Problema'],
    ok: ['OK', 'Fatto', 'Completato', 'Successo', 'Finito', 'Terminato'],
    pending: ['In attesa', 'Elaborazione', 'Lavoro', 'Caricamento', 'In corso'],
    warning: ['Avviso', 'Attenzione', 'Notifica', 'Cautela'],
  },

  pt: {
    create: ['Criado', 'Cria', 'Escreva', 'Escrevendo', 'Faça', 'Gerar', 'Construir'],
    read: ['Lido', 'Lendo', 'Verifique', 'Verificando', 'Ver'],
    edit: ['Editado', 'Edita', 'Atualize', 'Atualizando', 'Modificar', 'Modificando', 'Patch'],
    delete: ['Excluído', 'Exclua', 'Apague', 'Apagando', 'Limpar', 'Destruir', 'Remover'],
    error: ['Erro', 'Falhou', 'Falha', 'Exceção', 'Problema'],
    ok: ['OK', 'Feito', 'Concluído', 'Sucesso', 'Terminado', 'Finalizado'],
    pending: ['Pendente', 'Processando', 'Trabalhando', 'Carregando', 'Em andamento'],
    warning: ['Aviso', 'Atenção', 'Notificação', 'Cuidado'],
  },

  nl: {
    create: ['Gemaakt', 'Maak', 'Schrijf', 'Schrijven', 'Doe', 'Genereer', 'Bouw'],
    read: ['Gelezen', 'Lezen', 'Controleer', 'Controleren', 'Bekijk'],
    edit: ['Bewerkt', 'Bewerk', 'Update', 'Updaten', 'Wijzig', 'Aanpassen', 'Patch'],
    delete: ['Verwijderd', 'Verwijder', 'Verwijderen', 'Verwijderend', 'Schoonmaken', 'Vernietigen', 'Verwijderen'],
    error: ['Fout', 'Mislukt', 'Mislukking', 'Uitzondering', 'Probleem'],
    ok: ['OK', 'Klaar', 'Compleet', 'Succes', 'Voltooid', 'Afgerond'],
    pending: ['In behandeling', 'Verwerken', 'Werken', 'Laden', 'Bezig'],
    warning: ['Waarschuwing', 'Let op', 'Kennisgeving', 'Voorzichtigheid'],
  },

  pl: {
    create: ['Utworzony', 'Twórz', 'Napisz', 'Pisze', 'Zrób', 'Generuj', 'Buduj'],
    read: ['Przeczytany', 'Czytam', 'Sprawdź', 'Sprawdzam', 'Zobacz'],
    edit: ['Edytowany', 'Edytuj', 'Zaktualizuj', 'Aktualizuję', 'Zmień', 'Modyfikuj', 'Patch'],
    delete: ['Usunięty', 'Usuń', 'Skasuj', 'Kasuję', 'Wyczyść', 'Zniszcz', 'Usuń'],
    error: ['Błąd', 'Niepowodzenie', 'Porażka', 'Wyjątek', 'Problem'],
    ok: ['OK', 'Gotowe', 'Zakończone', 'Sukces', 'Ukończone', 'Zrobione'],
    pending: ['Oczekiwanie', 'Przetwarzanie', 'Praca', 'Ładowanie', 'W trakcie'],
    warning: ['Ostrzeżenie', 'Uwaga', 'Powiadomienie', 'Ostrożność'],
  },

  // Extended languages - full locale strings
  da: {
    create: ['Oprettet', 'Opretter', 'Skriv', 'Skriver', 'Lav', 'Generér', 'Byg'],
    read: ['Læst', 'Læser', 'Tjek', 'Tjekker', 'Vis'],
    edit: ['Redigeret', 'Redigerer', 'Opdatér', 'Opdaterer', 'Ændr', 'Modificér', 'Patch'],
    delete: ['Slettet', 'Sletter', 'Fjern', 'Fjerner', 'Ryd', 'Ødelæg', 'Fjern'],
    error: ['Fejl', 'Mislykkedes', 'Fejl', 'Undtagelse', 'Problem'],
    ok: ['OK', 'Færdig', 'Afsluttet', 'Succes', 'Udført', 'Fuldført'],
    pending: ['Afventer', 'Behandler', 'Arbejder', 'Loader', 'I gang'],
    warning: ['Advarsel', 'Pas på', 'Bemærk', 'Opmærksomhed'],
  },

  no: {
    create: ['Opprettet', 'Oppretter', 'Skriv', 'Skriver', 'Lag', 'Generér', 'Bygg'],
    read: ['Lest', 'Leser', 'Sjekk', 'Sjekker', 'Vis'],
    edit: ['Redigert', 'Redigerer', 'Oppdatér', 'Oppdaterer', 'Endre', 'Modifisér', 'Patch'],
    delete: ['Slettet', 'Sletter', 'Fjern', 'Fjerner', 'Tøm', 'Ødelegg', 'Fjern'],
    error: ['Feil', 'Mislyktes', 'Feil', 'Unntak', 'Problem'],
    ok: ['OK', 'Ferdig', 'Fullført', 'Suksess', 'Utført', 'Fullført'],
    pending: ['Venter', 'Behandler', 'Arbeider', 'Laster', 'Pågår'],
    warning: ['Advarsel', 'Pass på', 'Merk', 'Oppmerksomhet'],
  },

  fi: {
    create: ['Luotu', 'Luo', 'Kirjoita', 'Kirjoittaa', 'Tee', 'Generoi', 'Rakenna'],
    read: ['Luettu', 'Lukee', 'Tarkista', 'Tarkistaa', 'Näytä'],
    edit: ['Muokattu', 'Muokkaa', 'Päivitä', 'Päivittää', 'Muuta', 'Modifioi', 'Patch'],
    delete: ['Poistettu', 'Poista', 'Tyhjennä', 'Tyhjentää', 'Tuhoa', 'Poista'],
    error: ['Virhe', 'Epäonnistui', 'Virhe', 'Poikkeus', 'Ongelma'],
    ok: ['OK', 'Valmis', 'Suoritettu', 'Onnistui', 'Tehty', 'Valmistunut'],
    pending: ['Odottaa', 'Käsittelee', 'Työskentelee', 'Lataa', 'Käynnissä'],
    warning: ['Varoitus', 'Varo', 'Huomautus', 'Huomio'],
  },

  cs: {
    create: ['Vytvořeno', 'Vytvářet', 'Napiš', 'Píše', 'Udělej', 'Generovat', 'Postavit'],
    read: ['Přečteno', 'Čte', 'Zkontroluj', 'Kontroluje', 'Zobraz'],
    edit: ['Upraveno', 'Upravuje', 'Aktualizuj', 'Aktualizuje', 'Změň', 'Modifikuj', 'Patch'],
    delete: ['Smazáno', 'Maže', 'Odstraň', 'Odstraňuje', 'Vyčisti', 'Znič', 'Odstraň'],
    error: ['Chyba', 'Selhalo', 'Chyba', 'Výjimka', 'Problém'],
    ok: ['OK', 'Hotovo', 'Dokončeno', 'Úspěch', 'Provedeno', 'Dokončeno'],
    pending: ['Čeká', 'Zpracovává', 'Pracuje', 'Načítá', 'Probíhá'],
    warning: ['Upozornění', 'Pozor', 'Poznámka', 'Pozornost'],
  },

  sk: {
    create: ['Vytvorené', 'Vytvára', 'Napíš', 'Píše', 'Urob', 'Generovať', 'Postaviť'],
    read: ['Prečítané', 'Číta', 'Skontroluj', 'Kontroluje', 'Zobraziť'],
    edit: ['Upravené', 'Upravuje', 'Aktualizuj', 'Aktualizuje', 'Zmeň', 'Modifikuj', 'Patch'],
    delete: ['Vymazané', 'Maže', 'Odstráň', 'Odstraňuje', 'Vyčisti', 'Znič', 'Odstráň'],
    error: ['Chyba', 'Zlyhalo', 'Chyba', 'Výnimka', 'Problém'],
    ok: ['OK', 'Hotovo', 'Dokončené', 'Úspech', 'Vykonané', 'Dokončené'],
    pending: ['Čaká', 'Spracováva', 'Pracuje', 'Načítava', 'Prebieha'],
    warning: ['Upozornenie', 'Pozor', 'Poznámka', 'Pozornosť'],
  },

  hu: {
    create: ['Létrehozva', 'Létrehoz', 'Írj', 'Ír', 'Csinálj', 'Generálj', 'Építs'],
    read: ['Olvasva', 'Olvas', 'Ellenőrizd', 'Ellenőriz', 'Mutasd'],
    edit: ['Szerkesztve', 'Szerkeszt', 'Frissítsd', 'Frissít', 'Módosítsd', 'Módosít', 'Patch'],
    delete: ['Törölve', 'Töröl', 'Távolítsd', 'Távolít', 'Tisztítsd', 'Semmisítsd', 'Törölj'],
    error: ['Hiba', 'Sikertelen', 'Hiba', 'Kivétel', 'Probléma'],
    ok: ['OK', 'Kész', 'Befejezve', 'Siker', 'Elvégezve', 'Befejezve'],
    pending: ['Függőben', 'Feldolgozás', 'Dolgozik', 'Betöltés', 'Folyamatban'],
    warning: ['Figyelmeztetés', 'Vigyázat', 'Megjegyzés', 'Figyelem'],
  },

  ro: {
    create: ['Creat', 'Creează', 'Scrie', 'Scriind', 'Fă', 'Generează', 'Construiește'],
    read: ['Citit', 'Citește', 'Verifică', 'Verificând', 'Vezi'],
    edit: ['Editat', 'Editează', 'Actualizează', 'Actualizând', 'Modifică', 'Modificând', 'Patch'],
    delete: ['Șters', 'Șterge', 'Elimină', 'Eliminând', 'Curăță', 'Distruge', 'Elimină'],
    error: ['Eroare', 'Eșuat', 'Eroare', 'Excepție', 'Problemă'],
    ok: ['OK', 'Gata', 'Finalizat', 'Succes', 'Executat', 'Terminat'],
    pending: ['În așteptare', 'Procesează', 'Lucrează', 'Se încarcă', 'În curs'],
    warning: ['Avertisment', 'Atenție', 'Notificare', 'Atenție'],
  },

  bg: {
    create: ['Създадено', 'Създава', 'Пиши', 'Пише', 'Направи', 'Генерирай', 'Изгради'],
    read: ['Прочетено', 'Чете', 'Провери', 'Проверява', 'Виж'],
    edit: ['Редактирано', 'Редактира', 'Актуализирай', 'Актуализира', 'Промени', 'Модифицирай', 'Patch'],
    delete: ['Изтрито', 'Изтрива', 'Премахни', 'Премахва', 'Изчисти', 'Унищожи', 'Премахни'],
    error: ['Грешка', 'Неуспешно', 'Грешка', 'Изключение', 'Проблем'],
    ok: ['OK', 'Готово', 'Завършено', 'Успех', 'Изпълнено', 'Приключено'],
    pending: ['В очакване', 'Обработва', 'Работи', 'Зарежда', 'В процес'],
    warning: ['Предупреждение', 'Внимание', 'Забележка', 'Внимание'],
  },

  hr: {
    create: ['Stvoreno', 'Stvara', 'Napiši', 'Piše', 'Napravi', 'Generiraj', 'Gradi'],
    read: ['Pročitano', 'Čita', 'Provjeri', 'Provjerava', 'Vidi'],
    edit: ['Uređeno', 'Uređuje', 'Ažuriraj', 'Ažurira', 'Promijeni', 'Modificiraj', 'Patch'],
    delete: ['Izbrisano', 'Briše', 'Ukloni', 'Uklanja', 'Očisti', 'Uništi', 'Ukloni'],
    error: ['Greška', 'Neuspješno', 'Greška', 'Iznimka', 'Problem'],
    ok: ['OK', 'Gotovo', 'Dovršeno', 'Uspjeh', 'Izvršeno', 'Završeno'],
    pending: ['Na čekanju', 'Obrađuje', 'Radi', 'Učitava', 'U tijeku'],
    warning: ['Upozorenje', 'Oprez', 'Napomena', 'Pažnja'],
  },

  sr: {
    create: ['Створено', 'Ствара', 'Пиши', 'Пише', 'Направи', 'Генериши', 'Гради'],
    read: ['Прочитано', 'Чита', 'Провери', 'Проверава', 'Види'],
    edit: ['Уређено', 'Уређује', 'Ажурирај', 'Ажурира', 'Промени', 'Модификуј', 'Patch'],
    delete: ['Избрисано', 'Брише', 'Уклони', 'Уклања', 'Очисти', 'Уништи', 'Уклони'],
    error: ['Грешка', 'Неуспешно', 'Грешка', 'Изузетак', 'Проблем'],
    ok: ['OK', 'Готово', 'Довршено', 'Успех', 'Извршено', 'Завршено'],
    pending: ['На чекању', 'Обрађује', 'Ради', 'Учитава', 'У току'],
    warning: ['Упозорење', 'Опрез', 'Напомена', 'Пажња'],
  },

  sl: {
    create: ['Ustvarjeno', 'Ustvarja', 'Napiši', 'Piše', 'Naredi', 'Generiraj', 'Gradi'],
    read: ['Prebrano', 'Bere', 'Preveri', 'Preverja', 'Glej'],
    edit: ['Urejeno', 'Ureja', 'Posodobi', 'Posodablja', 'Spremeni', 'Modificiraj', 'Patch'],
    delete: ['Izbrisano', 'Briše', 'Odstrani', 'Odstranjuje', 'Počisti', 'Uniči', 'Odstrani'],
    error: ['Napaka', 'Neuspešno', 'Napaka', 'Izjema', 'Težava'],
    ok: ['OK', 'Končano', 'Dokončano', 'Uspeh', 'Izvedeno', 'Zaključeno'],
    pending: ['Na čakanju', 'Obdeluje', 'Dela', 'Nalaga', 'V teku'],
    warning: ['Opozorilo', 'Previdnost', 'Opomba', 'Pozornost'],
  },

  el: {
    create: ['Δημιουργήθηκε', 'Δημιουργεί', 'Γράψε', 'Γράφει', 'Κάνε', 'Δημιούργησε', 'Κατασκεύασε'],
    read: ['Διαβάστηκε', 'Διαβάζει', 'Έλεγξε', 'Ελέγχει', 'Δες'],
    edit: ['Επεξεργασμένο', 'Επεξεργάζεται', 'Ενημέρωσε', 'Ενημερώνει', 'Άλλαξε', 'Τροποποίησε', 'Patch'],
    delete: ['Διαγραμμένο', 'Διαγράφει', 'Αφαίρεσε', 'Αφαιρεί', 'Καθάρισε', 'Κατέστρεψε', 'Αφαίρεσε'],
    error: ['Σφάλμα', 'Απέτυχε', 'Σφάλμα', 'Εξαίρεση', 'Πρόβλημα'],
    ok: ['OK', 'Ολοκληρώθηκε', 'Ολοκληρωμένο', 'Επιτυχία', 'Εκτελέστηκε', 'Τελείωσε'],
    pending: ['Σε εκκρεμότητα', 'Επεξεργάζεται', 'Δουλεύει', 'Φορτώνει', 'Σε εξέλιξη'],
    warning: ['Προειδοποίηση', 'Προσοχή', 'Σημείωση', 'Προσοχή'],
  },

  tr: {
    create: ['Oluşturuldu', 'Oluşturuyor', 'Yaz', 'Yazıyor', 'Yap', 'Oluştur', 'İnşa et'],
    read: ['Okundu', 'Okuyor', 'Kontrol et', 'Kontrol ediyor', 'Gör'],
    edit: ['Düzenlendi', 'Düzenliyor', 'Güncelle', 'Güncelliyor', 'Değiştir', 'Modifiye et', 'Patch'],
    delete: ['Silindi', 'Siliyor', 'Kaldır', 'Kaldırıyor', 'Temizle', 'Yok et', 'Kaldır'],
    error: ['Hata', 'Başarısız', 'Hata', 'İstisna', 'Sorun'],
    ok: ['OK', 'Tamamlandı', 'Tamamlandı', 'Başarılı', 'Yapıldı', 'Bitti'],
    pending: ['Beklemede', 'İşleniyor', 'Çalışıyor', 'Yükleniyor', 'Devam ediyor'],
    warning: ['Uyarı', 'Dikkat', 'Not', 'Dikkat'],
  },

  ru: {
    create: ['Создано', 'Создает', 'Пиши', 'Пишет', 'Сделай', 'Создай', 'Построй'],
    read: ['Прочитано', 'Читает', 'Проверь', 'Проверяет', 'Покажи'],
    edit: ['Отредактировано', 'Редактирует', 'Обнови', 'Обновляет', 'Измени', 'Модифицируй', 'Patch'],
    delete: ['Удалено', 'Удаляет', 'Удали', 'Удаляет', 'Очисти', 'Уничтожь', 'Удали'],
    error: ['Ошибка', 'Не удалось', 'Ошибка', 'Исключение', 'Проблема'],
    ok: ['OK', 'Готово', 'Завершено', 'Успех', 'Выполнено', 'Закончено'],
    pending: ['Ожидание', 'Обрабатывает', 'Работает', 'Загружает', 'В процессе'],
    warning: ['Предупреждение', 'Осторожно', 'Заметка', 'Внимание'],
  },

  uk: {
    create: ['Створено', 'Створює', 'Пиши', 'Пише', 'Зроби', 'Створи', 'Побудуй'],
    read: ['Прочитано', 'Читає', 'Перевір', 'Перевіряє', 'Покажи'],
    edit: ['Відредаговано', 'Редагує', 'Онови', 'Оновлює', 'Зміни', 'Модифікуй', 'Patch'],
    delete: ['Видалено', 'Видаляє', 'Видали', 'Видаляє', 'Очисти', 'Знищ', 'Видали'],
    error: ['Помилка', 'Не вдалося', 'Помилка', 'Виняток', 'Проблема'],
    ok: ['OK', 'Готово', 'Завершено', 'Успіх', 'Виконано', 'Закінчено'],
    pending: ['Очікування', 'Обробляє', 'Працює', 'Завантажує', 'В процесі'],
    warning: ['Попередження', 'Обережно', 'Примітка', 'Увага'],
  },

  et: {
    create: ['Loodud', 'Loob', 'Kirjuta', 'Kirjutab', 'Tee', 'Genereeri', 'Ehita'],
    read: ['Loetud', 'Loeb', 'Kontrolli', 'Kontrollib', 'Vaata'],
    edit: ['Redigeeritud', 'Redigeerib', 'Uuenda', 'Uuendab', 'Muuda', 'Modifitseeri', 'Patch'],
    delete: ['Kustutatud', 'Kustutab', 'Eemalda', 'Eemaldab', 'Puhasta', 'Hävita', 'Eemalda'],
    error: ['Viga', 'Ebaõnnestus', 'Viga', 'Erind', 'Probleem'],
    ok: ['OK', 'Valmis', 'Lõpetatud', 'Õnnestus', 'Tehtud', 'Lõppenud'],
    pending: ['Ootel', 'Töötleb', 'Töötab', 'Laadib', 'Pooleli'],
    warning: ['Hoiatus', 'Ettevaatust', 'Märkus', 'Tähelepanu'],
  },

  lv: {
    create: ['Izveidots', 'Izveido', 'Raksti', 'Raksta', 'Dari', 'Ģenerē', 'Būvē'],
    read: ['Lasīts', 'Lasa', 'Pārbaudi', 'Pārbauda', 'Skatīt'],
    edit: ['Rediģēts', 'Rediģē', 'Atjaunini', 'Atjaunina', 'Maini', 'Modificē', 'Patch'],
    delete: ['Dzēsts', 'Dzēš', 'Noņemt', 'Noņem', 'Notīrīt', 'Iznīcināt', 'Noņemt'],
    error: ['Kļūda', 'Neizdevās', 'Kļūda', 'Izņēmums', 'Problēma'],
    ok: ['OK', 'Gatavs', 'Pabeigts', 'Veiksme', 'Izpildīts', 'Pabeigts'],
    pending: ['Gaida', 'Apstrādā', 'Strādā', 'Ielādē', 'Notiek'],
    warning: ['Brīdinājums', 'Uzmanību', 'Piezīme', 'Uzmanība'],
  },

  lt: {
    create: ['Sukurta', 'Kuriant', 'Rašyk', 'Rašo', 'Padaryk', 'Generuok', 'Statyk'],
    read: ['Nuskaityta', 'Skaito', 'Patikrink', 'Tikrina', 'Žiūrėk'],
    edit: ['Redaguota', 'Redaguoja', 'Atnaujink', 'Atnaujina', 'Pakeisk', 'Modifikuok', 'Patch'],
    delete: ['Ištrinta', 'Trina', 'Pašalinti', 'Šalina', 'Išvalyti', 'Sunaikinti', 'Pašalinti'],
    error: ['Klaida', 'Nepavyko', 'Klaida', 'Išimtis', 'Problema'],
    ok: ['OK', 'Baigta', 'Užbaigta', 'Sėkmė', 'Atlikta', 'Pabaigta'],
    pending: ['Laukiama', 'Apdoroja', 'Dirba', 'Krauna', 'Vykdoma'],
    warning: ['Įspėjimas', 'Atsargiai', 'Pastaba', 'Dėmesio'],
  },
};

/**
 * Get locale strings for a specific language
 */
export function getLocale(lang: LanguageCode): LocaleStrings {
  if (!lang || typeof lang !== 'string') {
    console.warn('getLocale: invalid language code, defaulting to English');
    return locales.en;
  }

  const locale = locales[lang];
  if (!locale) {
    console.warn(`getLocale: no locale found for "${lang}", defaulting to English`);
    return locales.en;
  }

  return locale;
}

/**
 * Detect language from text using franc-ce (trigram-based) with fallback to rule-based detection
 * Supports 175+ languages via franc, with high accuracy for our 9 core languages
 */
export function detectLanguage(text: string): LanguageCode {
  // Validate input - return English as default for empty/null/undefined
  if (!text || typeof text !== 'string') {
    return 'en';
  }

  // Handle empty or very short text with rule-based detection
  if (text.length < 3) {
    return 'en';
  }

  // Try franc-ce first (supports 175+ languages)
  try {
    const francResult = franc(text, { minLength: 3 });

    if (francResult && francResult[0]) {
      const iso3Code = francResult[0][0] as string;
      const mappedCode = LANG_CODE_MAP[iso3Code];

      // If we have a mapping to our supported languages, use it
      if (mappedCode) {
        return mappedCode;
      }

      // For unsupported languages, fall back to rule-based
      // This ensures we always return one of our 9 supported languages
      return detectLanguageRuleBased(text);
    }
  } catch (error) {
    console.warn('franc-ce detection failed, falling back to rule-based:', error);
  }

  // Fallback to rule-based detection
  return detectLanguageRuleBased(text);
}

/**
 * Rule-based language detection for all 27 languages
 * Used as fallback when franc-ce cannot determine language
 */
function detectLanguageRuleBased(text: string): LanguageCode {
  const lower = text.toLowerCase();

  // ========== UNIQUE CHARACTER DETECTION (highest priority) ==========

  // Swedish: å is unique
  if (/[åÅ]/.test(text)) return 'sv';

  // Turkish: ı, İ, ğ are unique
  if (/[ıİğ]/.test(text)) return 'tr';

  // German: ü, ß are unique
  if (/[üÜß]/.test(text)) return 'de';

  // French: è, ê, à, ù, ç are unique
  if (/[èêùçÈÊÙÇ]/.test(text)) return 'fr';

  // Portuguese: ã, õ are unique
  if (/[ãõÃÕ]/.test(text)) return 'pt';

  // Polish: ą, ę, ś, ć, ź, ż, ł, ń are unique
  if (/[ąćęłńśźżĄĆĘŁŃŚŹŻ]/.test(text)) return 'pl';

  // Estonian words (check BEFORE Slovak ä check - Estonian also uses ä)
  if (lower.includes('tere') || lower.includes('kuidas')) return 'et';

  // Slovak: ä, ľ, ĺ, ŕ, ô are unique (after Estonian words check)
  if (/[äľĺŕô]/.test(text)) return 'sk';

  // Slovak word check (BEFORE Czech character check - Slovak and Czech share characters like š)
  // Use word boundary \bako\b to avoid matching "kako" in Croatian/Slovenian
  if (/\bako\b/.test(lower)) return 'sk';

  // Czech: č, ř, š, ž, ú, ů, ě, ď, ť, ň
  if (/[čřšžúůěďťňČŘŠŽÚŮĚĎŤŇ]/.test(text)) return 'cs';

  // Hungarian: ő, ű are unique
  if (/[őűŐŰ]/.test(text)) return 'hu';

  // Romanian: ă, â, î, ș, ț are unique
  if (/[ăâîșțĂÂÎȘȚ]/.test(text)) return 'ro';

  // Ukrainian: і, ї, є are unique
  if (/[іїєІЇЄ]/.test(text)) return 'uk';

  // Estonian: õ is unique
  if (/[õÕ]/.test(text)) return 'et';

  // Latvian: ā, ē, ī, ū, ķ, ļ, ņ,ŗ
  if (/[āēīūķļņŗĀĒĪŪĶĻŅŖ]/.test(text)) return 'lv';

  // Lithuanian: ą, ę, ė, į, ų, ū
  if (/[ąęėįųūĄĘĖĮŲŪ]/.test(text)) return 'lt';

  // Danish/Norwegian: æ, ø
  if (/[æøÆØ]/.test(text)) {
    if (/\bhei\b/.test(lower)) return 'no';
    return 'da';
  }

  // Estonian words (check BEFORE Finnish ä/ö - Estonian also uses ä)
  if (lower.includes('tere') || lower.includes('kuidas')) return 'et';

  // Finnish: ä, ö (after Swedish å check, after Estonian words)
  if (/[äöÄÖ]/.test(text)) return 'fi';

  // Serbian Cyrillic specific: ђ, њ, ћ, џ (check BEFORE Russian Cyrillic)
  if (/[ђњћџЂЊЋЏ]/.test(text)) return 'sr';

  // Croatian/Serbian Latin: č, ć, ž, š, đ
  if (/[čćžšđČĆŽŠĐ]/.test(text)) {
    if (lower.includes('bok') || lower.includes('svijete')) return 'hr';
    if (lower.includes('zdravo') || lower.includes('svete')) return 'sr';
    return 'hr';
  }

  // Slovenian: č, š, ž
  if (/[čšžČŠŽ]/.test(text)) return 'sl';

  // Greek: Greek alphabet
  if (/[α-ωΑ-Ω]/.test(text)) return 'el';

  // Turkish: ö, ü, ç, ş
  if (/[öüçşÖÜÇŞ]/.test(text)) return 'tr';

  // Bulgarian Cyrillic: ж, ш, щ, ч, ю, я
  if (/[жшщчюяЖШЩЧЮЯ]/.test(text)) return 'bg';

  // Russian Cyrillic words (check BEFORE full Cyrillic range - use includes for Cyrillic)
  if (lower.includes('привет') || lower.includes('мир') || lower.includes('дела')) return 'ru';

  // Ukrainian Cyrillic words (check BEFORE full Cyrillic range)
  if (lower.includes('привіт') || lower.includes('світ') || lower.includes('справи')) return 'uk';

  // Bulgarian Cyrillic words (check BEFORE full Cyrillic range)
  if (lower.includes('здравей') || lower.includes('свят')) return 'bg';

  // Serbian Cyrillic words (check BEFORE full Cyrillic range)
  if (lower.includes('здраво') || lower.includes('свете') || lower.includes('како')) return 'sr';

  // Russian Cyrillic (full range - AFTER word checks for other Cyrillic languages)
  if (/[абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/.test(text)) {
    return 'ru';
  }

  // ========== WORD-BASED DETECTION (BEFORE Spanish/Italian á/à check) ==========

  // English words
  if (/\b(hello|world|how|are|you)\b/.test(lower)) return 'en';

  // Finnish words (ä/ö already checked, now check remaining words)
  if (/\b(miten|voit)\b/.test(lower)) return 'fi';

  // Hungarian words (világ has á - check BEFORE Spanish)
  if (/\b(szia|hogy|vagy|világ)\b/.test(lower)) return 'hu';

  // Romanian words
  if (/\b(salut|lume|ce|mai|faci)\b/.test(lower)) return 'ro';

  // Croatian words
  if (/\b(bok|svijete)\b/.test(lower)) return 'hr';

  // Slovenian words
  if (/\b(pozdravljen)\b/.test(lower)) return 'sl';

  // Latvian words
  if (/\b(sveika|pasaule)\b/.test(lower)) return 'lv';

  // Lithuanian words
  if (/\b(labas|pasaulis)\b/.test(lower)) return 'lt';

  // Danish vs Norwegian (already checked æ/ø chars, now check words)
  if (/\bhei\b/.test(lower)) return 'no';
  if (/\b(verden|hvordan)\b/.test(lower)) return 'da';

  // Portuguese words (Olá - use includes since \b doesn't work with accented chars)
  if (lower.includes('olá')) return 'pt';

  // Slovak words (ako, sa - check BEFORE Czech "jak, se")
  if (lower.includes('ako')) return 'sk';
  // Note: "sa" needs context - check it's not part of another word
  if (/\bsa\b/.test(lower)) return 'sk';

  // Czech words (jak, se, máš)
  if (/\b(jak|se)\b/.test(lower)) return 'cs';
  if (lower.includes('máš')) return 'cs';

  // Dutch words (wereld, hoe, gaat)
  if (/\b(wereld|hoe|gaat)\b/.test(lower)) return 'nl';

  // German words (wie, geht, welt)
  if (/\b(wie|geht)\b/.test(lower)) return 'de';
  if (/\bwelt\b/.test(lower)) return 'de';

  // Italian words (come, stai)
  if (/\b(come|stai)\b/.test(lower)) return 'it';

  // Spanish words (hola, mundo, cómo, estás)
  if (/\b(hola|mundo)\b/.test(lower)) return 'es';
  if (lower.includes('cómo') || lower.includes('estás')) return 'es';

  // Spanish/Italian character detection (AFTER word-based)
  // Spanish: á, í, ó, ú, ñ
  if (/[áíóúÁÍÓÚñÑ]/.test(text)) return 'es';

  // Italian: à, ì, ò, ù
  if (/[àìòùÀÌÒÙ]/.test(text)) return 'it';

  // Default to English
  return 'en';
}

/**
 * Get all supported language codes (all 27 languages have full locale support)
 */
export function getSupportedLanguages(): LanguageCode[] {
  return [
    'en', 'sv', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'pl',
    'da', 'no', 'fi', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sr', 'sl', 'el', 'tr', 'ru', 'uk', 'et', 'lv', 'lt'
  ];
}

/**
 * Get extended language codes (same as supported - all have full locale support)
 * Kept for backwards compatibility
 */
export function getExtendedLanguages(): LanguageCode[] {
  return [];
}

/**
 * Get all detectable languages (same as supported - all have full locale support)
 */
export function getAllLanguages(): LanguageCode[] {
  return getSupportedLanguages();
}

/**
 * Get human-readable language name
 */
export function getLanguageName(code: LanguageCode): string {
  const names: Record<LanguageCode, string> = {
    // Core languages
    en: 'English',
    sv: 'Svenska (Swedish)',
    de: 'Deutsch (German)',
    es: 'Español (Spanish)',
    fr: 'Français (French)',
    it: 'Italiano (Italian)',
    pt: 'Português (Portuguese)',
    nl: 'Nederlands (Dutch)',
    pl: 'Polski (Polish)',
    // Extended languages
    da: 'Dansk (Danish)',
    no: 'Norsk (Norwegian)',
    fi: 'Suomi (Finnish)',
    cs: 'Čeština (Czech)',
    sk: 'Slovenčina (Slovak)',
    hu: 'Magyar (Hungarian)',
    ro: 'Română (Romanian)',
    bg: 'Български (Bulgarian)',
    hr: 'Hrvatski (Croatian)',
    sr: 'Српски (Serbian)',
    sl: 'Slovenščina (Slovenian)',
    el: 'Ελληνικά (Greek)',
    tr: 'Türkçe (Turkish)',
    ru: 'Русский (Russian)',
    uk: 'Українська (Ukrainian)',
    et: 'Eesti (Estonian)',
    lv: 'Latviešu (Latvian)',
    lt: 'Lietuvių (Lithuanian)',
  };
  return names[code] ?? code;
}