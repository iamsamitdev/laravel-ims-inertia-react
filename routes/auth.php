<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| เส้นทางสำหรับผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบ (Guest Routes)
|--------------------------------------------------------------------------
|
| เส้นทางในกลุ่มนี้จะใช้ middleware 'guest' ซึ่งจะอนุญาตให้เข้าถึงได้
| เฉพาะผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบเท่านั้น หากผู้ใช้เข้าสู่ระบบแล้ว
| จะถูกเปลี่ยนเส้นทางไปยังหน้าหลัก
|
*/
Route::middleware('guest')->group(function () {
    // การลงทะเบียนผู้ใช้ใหม่
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');  // แสดงฟอร์มลงทะเบียน
    Route::post('register', [RegisteredUserController::class, 'store']);  // บันทึกข้อมูลผู้ใช้ใหม่
    
    // การเข้าสู่ระบบ
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');  // แสดงฟอร์มเข้าสู่ระบบ
    Route::post('login', [AuthenticatedSessionController::class, 'store']);  // ตรวจสอบและสร้างเซสชันการเข้าสู่ระบบ
    
    // การขอรีเซ็ตรหัสผ่าน
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');  // แสดงฟอร์มขอรีเซ็ตรหัสผ่าน
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');  // ส่งอีเมลลิงก์รีเซ็ตรหัสผ่าน
    
    // การรีเซ็ตรหัสผ่าน
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');  // แสดงฟอร์มรีเซ็ตรหัสผ่านพร้อมโทเค็น
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');  // บันทึกรหัสผ่านใหม่
});

/*
|--------------------------------------------------------------------------
| เส้นทางสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว (Authentication Routes)
|--------------------------------------------------------------------------
|
| เส้นทางในกลุ่มนี้จะใช้ middleware 'auth' ซึ่งจะอนุญาตให้เข้าถึงได้
| เฉพาะผู้ใช้ที่เข้าสู่ระบบแล้วเท่านั้น หากผู้ใช้ยังไม่ได้เข้าสู่ระบบ
| จะถูกเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
|
*/
Route::middleware('auth')->group(function () {
    // การยืนยันอีเมล
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');  // แสดงหน้าแจ้งเตือนให้ยืนยันอีเมล
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');  // ตรวจสอบและยืนยันอีเมลจากลิงก์ที่ส่งไปยังอีเมลของผู้ใช้
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');  // ส่งอีเมลยืนยันอีกครั้ง (จำกัด 6 ครั้งต่อนาที)
    
    // การยืนยันรหัสผ่าน (สำหรับการดำเนินการที่สำคัญ)
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');  // แสดงฟอร์มยืนยันรหัสผ่าน
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);  // ตรวจสอบรหัสผ่านที่ผู้ใช้ป้อน
    
    // การเปลี่ยนรหัสผ่าน
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');  // อัพเดทรหัสผ่านของผู้ใช้
    
    // การออกจากระบบ
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');  // ลบเซสชันและออกจากระบบ
});
